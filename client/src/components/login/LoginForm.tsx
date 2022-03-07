import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "formik";
import { TextInput } from "../inputs/shared/inputs/TextInput";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const LoginForm: React.FC = () => {
    const classes = useStyles();

    return (
        <Form noValidate className={classes.form}>
            <TextInput label="Username" name="username" placeholder="Enter username" required />
            <TextInput label="Password" name="password" placeholder="Enter password" type="password" />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign In
            </Button>
        </Form>
    );
};
