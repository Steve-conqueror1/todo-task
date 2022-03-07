import * as Yup from "yup";

export const taskValidationSchema = Yup.object().shape({
    text: Yup.string().required("Please enter task"),
    username: Yup.string().required("Please enter username"),
    email: Yup.string()
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Enter valid email")
            .required("Please enter email"),
});
