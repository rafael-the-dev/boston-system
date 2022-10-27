import * as React from "react";
import { Alert, AlertTitle } from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import Dialog from "../dialog";

const MessageDialog = ({ description, onOpen, title, type }) => {
    const onClose = React.useRef(null);

    const closeHandler = () => onClose.current?.();

    return (
        <Dialog
            onClose={onClose}
            onOpen={onOpen}>
            <Alert 
                className={classNames(classes.alert)} 
                onClose={closeHandler}
                severity={type} >
                { title && <AlertTitle>{ title }</AlertTitle> }
                { description ?? "" }
            </Alert>
        </Dialog>
    );
};

export default MessageDialog;