import * as React from "react";
import classNames from "classnames"

import classes from "./styles.module.css";

import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import SearchForm from "../search-form";

const Container = ({ categories, onOpen }) => {
    const onClose = React.useRef(null)

    const closeHandler = () => onClose.current?.();
    
    return (
        <Dialog
            classes={{ paper: classNames(classes.paper, `m-0`) }}
            onClose={onClose}
            onOpen={onOpen}>
            <DialogHeader
                classes={{ root: "bg-blue-700 pl-4 text-white" }}
                onClose={closeHandler}>
                Adicionar novo produto
            </DialogHeader>
            <SearchForm categories={categories} />
        </Dialog>
    );
};

export default Container;