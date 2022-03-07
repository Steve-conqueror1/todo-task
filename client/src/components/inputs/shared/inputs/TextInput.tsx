import React from "react";
import { TextField } from "formik-material-ui";
import { Field, useField } from "formik";

type Props = {
    name: string;
    type?: string;
    label: string;
    placeholder?: string;
    required?: boolean;
};

export const TextInput = (props: Props): React.ReactElement => {
    const { name, label, placeholder, required, type = "text" } = props;

    const [, meta, helpers] = useField(name as string);

    const hasError = Boolean(meta.touched && meta.error);

    const handleFocus = () => {
        if (!meta.touched) {
            helpers.setTouched(true);
        }
    };

    return (
        <Field
            component={TextField}
            error={hasError}
            onFocus={handleFocus}
            placeholder={placeholder}
            variant="outlined"
            margin="normal"
            fullWidth
            name={name}
            label={label}
            type={type}
            required={required}
        />
    );
};
