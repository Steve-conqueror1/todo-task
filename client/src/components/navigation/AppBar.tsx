import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import {useSession} from "../../context/session.context";
import {AccountCircleRounded} from "@material-ui/icons";
import {api} from "../../helpers/api";

type InvalidToken = {
    token: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        username: {
            marginRight: "2rem",
            color: "#fff"
        },
        profile: {
            marginRight: "1rem"
        }
    }),
);

export const ButtonAppBar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [session, logout ] = useSession()
    const {username, token} = session;

    const handleLinkClick = (to: string) => {
        navigate(to);
    };

    const invalidateToken = () => {
         api(null, process.env.REACT_APP_API_SERVER)
            .init({
                body: JSON.stringify({token}),
                headers: { "Content-Type": "application/json" },
            })
             .post<InvalidToken>('/logout')
            .then(()=>{
                console.log("Invalidating token")
                 logout()
            })
    }

    const handleLogout = () => {
        invalidateToken()
        return navigate("/login");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => handleLinkClick("/")}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography onClick={() => handleLinkClick("/")} variant="h6" className={classes.title}>
                        Tasks
                    </Typography>
                    {username && <Button  className ={classes.username} ><AccountCircleRounded className={classes.profile}/> {username}</Button>}
                    {token ? (<Button onClick={() => handleLogout()} color="inherit">
                        Logout
                    </Button>) :( <Button onClick={() => handleLinkClick("/login")} color="inherit">
                        Login
                    </Button>) }
                </Toolbar>
            </AppBar>
        </div>
    );
};
