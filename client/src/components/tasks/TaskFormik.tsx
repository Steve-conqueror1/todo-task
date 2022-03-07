import React, {FC} from "react";
import { FormikValues, FormikHelpers, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "./../../helpers/api";
import { useSession} from "../../context/session.context";
import {taskValidationSchema} from "./taskValidationSchema";
import {TaskForm} from "./TaskForm";
import {Box} from "@material-ui/core";
import {TableProps } from "../table/TodosTable";
import {makeStyles} from "@material-ui/core/styles";
import {ADMIN_EDITED_STATUS, CREATED} from "../../helpers/constants";
import {AppSnackbar} from "../alerts/Snackbar";

export interface User {
    email: string;
    username: string;
    password: string;
    userType: string;
}

interface TaskProps {
    text: String;
    email: String;
    username: String;
    isCompleted?: boolean;
}

type TaskResponse = {
    text: string;
    status: string;
    createdBy: string;
    id: string;
};

type Params = {
    id?: string
}


const useStyles = makeStyles((theme) => ({
    formik: {
        display: "flex",
        justifyContent: "center"
    },
}));

export const TaskFormik: FC = () => {
    const [initialValues, setInitialValues] = React.useState<TaskProps>({ text: "", username:"", email: "", isCompleted: false })
    const [session] = useSession();
    const { token} = session
    const navigate = useNavigate();
    const { id } = useParams<Params>()

    const [open, setOpen] = React.useState(false);
    const [taskLoaded, setTaskLoaded] = React.useState(false);
    const [task, setTask] = React.useState<TableProps>();
    const [error, setError] = React.useState<string>('');
    const [message, setMessage] = React.useState<string>('');
    const [isCompleted, setIsCompleted] = React.useState<boolean>(false);
     const classes = useStyles();

     const handleStatusChange = () => {
         setIsCompleted(!isCompleted)
     }

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    navigate("/")
   };

       const getTask = (id: string) => {
        api(null, process.env.REACT_APP_API_SERVER)
            .get<TableProps>(`/tasks/${id}`)
            .then((response: TableProps) => {
                setTask(response);
                setTaskLoaded(true)
                if(response.isCompleted){
                    setIsCompleted(true)
                }
            })
    };

   React.useEffect(() => {
       if(id){
         getTask(id)
       }
   }, [id])

   React.useEffect(() => {
    if(taskLoaded){
        setInitialValues({text: ((task?.text) as string), username: ((task?.username) as string), email: ((task?.email) as string), isCompleted: task?.isCompleted})
    }
   }, [taskLoaded])

    const handleSubmit = (values: FormikValues, actions: FormikHelpers<TaskProps>) => {
        const { setSubmitting } = actions;
        const method = id? 'put': 'post'
        const url = id ? `/tasks/${id}` : '/tasks'
        let data;
        if(id){
            data = {
                status: (task?.editedByAdmin || values["text"] !== task?.text)? ADMIN_EDITED_STATUS : CREATED,
                isCompleted: task?.isCompleted || isCompleted,
                editedByAdmin: task?.editedByAdmin || values["text"] !== task?.text }
        }

        api(token, process.env.REACT_APP_API_SERVER)
            .init({
                body: JSON.stringify({...values, ...data}),
                headers: { "Content-Type": "application/json" },
            })
            [method]<TaskResponse>(url)
            .then(()=>{
                setMessage(`Task ${id? "Updated" : "Created"} Successfully`)
                setOpen(true);
            })
            .catch((response: Response) => {
                if (response.status === 401){
                    setError("You need to login to perform this action")
                    setOpen(true);
                }else{
                     setError("Something went wrong")
                     setOpen(true);
                }
                setSubmitting(false);
            });
    };

    return (
        <>
            <AppSnackbar open={open} handleClose={handleClose} message={message} error={error}/>
            <Box className={classes.formik}>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={taskValidationSchema}
                    onSubmit={handleSubmit}
                >
                    <TaskForm taskId={id} handleStatusChange={handleStatusChange} isCompleted={isCompleted} />
                </Formik>
            </Box>
            </>
    );
};
