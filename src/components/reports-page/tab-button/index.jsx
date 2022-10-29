import * as React from "react";
import Button from "@mui/material/Button";
import classNames from "classnames";

import classes from "./styles.module.css";

import { SalesContext } from "src/context"

const TabButton = ({ id, index, }) => {
    const { addTab, addCurrentVisibleTab, currentTab, tabs } = React.useContext(SalesContext);

    const clickHandler = () => {
        return id === -1 ? addTab() : addCurrentVisibleTab(id);
    };

    return (
        <Button
            className={classNames( currentTab === id ? classNames(classes.active, "bg-white rounded-t-none rounded-b-xl text-black") : "",
            "capitalize" )}
            onClick={clickHandler}>
            { id === -1 ? "Add new tab" : `Tab ${index}` }
        </Button>
    );
};

export default TabButton;