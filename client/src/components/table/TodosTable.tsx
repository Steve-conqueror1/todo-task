import React, {FC} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { api } from "./../../helpers/api";
import { useNavigate } from "react-router-dom";
import {useSession} from "../../context/session.context";
import {EditOutlined} from "@material-ui/icons";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {Box} from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort';
import {ADMIN_EDITED_STATUS, CREATED, DONE} from "../../helpers/constants";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        padding: "2rem 5rem",
        marginTop: "2rem",
    },
    button: {
        margin: "4rem 0",
    },
    btnContainer: {
        width: "70%",
        marginLeft: "15%",
    },
    pagination:{
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center"
    },
    paginationButton:{
      width: "10rem"
    },
    sortIcon:{
        marginRight: '1rem',
        marginTop: '2rem',
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

export interface TableProps {
    username: string;
    email: string;
    status: string;
    text: string;
    isCompleted: boolean;
    editedByAdmin: boolean;
    _id:string;
}

export interface TaskResponse {
    data: TableProps[];
    documentCount: number;
    totalPages:  number;
}

export const TodosTable: FC = () => {
    const classes = useStyles();
    const [tasks, setTasks] = React.useState<TableProps[]>();
    const navigate = useNavigate();
    const [session] = useSession()
    const {token} = session
    const [page, setPage] = React.useState(1)
    const [totalPages, setTotalPages] = React.useState<number>()
    const [documentCount, setDocumentCount] = React.useState<number>(0)
    const [sortField, setSortField] = React.useState('_id')
    const [orderBy, setOrderBy] = React.useState<'desc' | 'asc'>('asc')

    const handleLinkClick = (to: string) => {
        navigate(to);
    };

    const handleSort = (event:   React.SyntheticEvent<EventTarget>) => {
        if((event.currentTarget as HTMLButtonElement).id === sortField){
            if(orderBy === 'asc'){
                setOrderBy('desc')
            } else {
                setOrderBy('asc')
            }
        }else{
        setOrderBy('asc')
        }
        setSortField((event.currentTarget as HTMLButtonElement).id)

    }

    const getData = () => {
        api(null, process.env.REACT_APP_API_SERVER)
            .get<TaskResponse>(`/tasks?page=${page}&sortBy=${sortField}&OrderBy=${orderBy}`)
            .then((response: TaskResponse) => {
                setTasks(response.data);
                setTotalPages(response.totalPages)
                setDocumentCount(response.documentCount)
            });
    };

    React.useEffect(() => {
        getData();
    }, [page, sortField, orderBy]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell onClick={handleSort}  id="username">ИМЯ ПОЛЬЗОВАТЕЛЯ <SortIcon  color="primary" className={classes.sortIcon} fontSize="small"/></TableCell>
                        <TableCell onClick={handleSort} id="email">EMAIL <SortIcon color="primary" className={classes.sortIcon} fontSize="small"/> </TableCell>
                        <TableCell onClick={handleSort} id="status">СТАТУС <SortIcon color="primary" className={classes.sortIcon} fontSize="small"/> </TableCell>
                        <TableCell>ТЕКСТ ЗАДАЧИ</TableCell>
                        {token && <TableCell></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks &&
                        tasks.map((task, index) => (
                            <TableRow key={index}>
                                <TableCell width={token ? "25%" : "20%"}>{task.username}</TableCell>
                                <TableCell width={token ? "25%" : "20%"}>{task.email}</TableCell>
                                <TableCell width={token ? "25%" : "20%"}>{task.editedByAdmin? ADMIN_EDITED_STATUS : !task.isCompleted ? CREATED: null } {task.isCompleted && DONE}</TableCell>
                                <TableCell width={token ? "25%" : "20%"}>{task.text} </TableCell>
                                {token && (<TableCell width={"20%"}>
                                    <Button onClick={() => handleLinkClick(`/tasks/update/${task._id}`)}>
                                        <EditOutlined color="primary"/>
                                    </Button>
                                </TableCell>)}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {documentCount>3 && (
                <Box className={classes.pagination}>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1} className={classes.paginationButton}
                        variant="contained"> <NavigateBeforeIcon/>Previous</Button>
                &nbsp;
                <Button onClick={() => setPage(page + 1)} disabled={page === totalPages || tasks && tasks.length === 0}
                        className={classes.paginationButton} variant="contained">Next<NavigateNextIcon/></Button>
            </Box>
            )}
            <div className={classes.btnContainer}>
                <Button
                    onClick={() => handleLinkClick("/tasks/create")}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                >
                    Create Task
                </Button>
            </div>
        </TableContainer>
    );
};
