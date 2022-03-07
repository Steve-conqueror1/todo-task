import React, {FC} from "react";
import {Alert} from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

type Props = {
    error?: string
    open: boolean;
    handleClose?: (event?: React.SyntheticEvent | Event, reason?: string) => void
    message: string
}

export const AppSnackbar:FC<Props> =(props) => {
    const {handleClose, open, error, message} = props

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert variant="filled" onClose={handleClose} severity={error? "error":"success"} color={error? "error":"success"}>
                  {message || error}
              </Alert>
        </Snackbar>
    )

}