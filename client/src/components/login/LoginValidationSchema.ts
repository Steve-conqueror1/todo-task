import * as Yup from "yup";

export const LoginValidationSchema = Yup.object().shape({
    username: Yup.string().min(2, "Username too short").max(50, "Username too Long!").required("Username Required"),
    password: Yup.string().min(2, "Password too short!").max(50, "Password Too Long!").required("Password required"),
});
