import React from "react";
import { FormikValues, FormikHelpers, Formik } from "formik";
import { LoginForm } from "./LoginForm";
import { LoginValidationSchema } from "./LoginValidationSchema";
import { CardContent } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { api } from "./../../helpers/api";
import { Alert } from "@material-ui/lab";
import { useSession } from "../../context/session.context";


export interface User {
    email: string;
    username: string;
    password: string;
    userType: string;
}

interface LoginFormProps {
    username: String;
    password: String;
}

type LoginResponse = {
    userId: string;
    email: string;
    userType: string;
    token: string;
    username: string;
};

export const LoginFormik = () => {
    const [errorText, setErrorText] = React.useState("");
    const initialValues: LoginFormProps = { username: "", password: "" };
    const [, setSession] = useSession();

    const navigate = useNavigate();

    const handleLogin = (response: LoginResponse) => {
        const { userType, email, username, token, userId } = response;

        const session = { isAuthenticated: true, token, userType, username, email, userId };
        setSession(session);
        navigate("/");
    };

    const handleSubmit = (values: FormikValues, actions: FormikHelpers<LoginFormProps>) => {
        const { setSubmitting } = actions;
        api(null, process.env.REACT_APP_API_SERVER)
            .init({
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" },
            })
            .post<LoginResponse>("/users/login")
            .then(handleLogin)
            .catch((response: Response) => {
                setSubmitting(false);
                setErrorText("Wrong credentials");
            });
    };
    return (
        <CardContent>
            {errorText && errorText.length && <Alert severity="error">{errorText}</Alert>}

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={LoginValidationSchema}
                onSubmit={handleSubmit}
            >
                <LoginForm />
            </Formik>
        </CardContent>
    );
};
