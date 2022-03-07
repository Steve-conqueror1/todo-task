import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "formik";
import { TextInput } from "../inputs/shared/inputs/TextInput";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {useSession} from "../../context/session.context";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "60%",
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type Props = {
    isCompleted: boolean,
    handleStatusChange: () => void
    taskId?:string
}

export const TaskForm: React.FC<Props> = (props: Props) => {
    const {isCompleted, handleStatusChange, taskId} = props
    const classes = useStyles();
      const [session] = useSession();
    const {token} = session

    return (
        <Form noValidate className={classes.form}>
            <TextInput label="username" name="username" placeholder="Enter Username" required />
            <TextInput label="email" name="email" placeholder="Enter Email" required />
            <TextInput label="Task" name="text" placeholder="Enter Task" required  />
            {token && taskId && (<FormControlLabel
                control={
                    <Checkbox
                        checked={isCompleted}
                        onChange={handleStatusChange}
                        name="primary"
                        color="primary"
                    />
                }
                label="Task is Complete"
            />)}
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Send Task
            </Button>
        </Form>
    );
};
