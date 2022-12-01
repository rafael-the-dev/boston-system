import * as React from "react";
import classNames from "classnames";
import { Button, IconButton } from "@mui/material"

import classes from "./styles.module.css";
import { SaleTabsContext } from "src/context";

import CloseIcon from '@mui/icons-material/Close';

const Tab = ({ id, index }) => {
    const { getCurrentTab, getTabs, removeTab, setCurrentTab } = React.useContext(SaleTabsContext);
    
    const isLessThan2 = getTabs().length < 2;
    const isSelected = id === getCurrentTab();
    console.log(getCurrentTab(), id)
    const clickHandler = () => setCurrentTab(id);
    const removeHandler = () => removeTab(id);

    return (
        <li 
            className={classNames(classes.root, "flex items-center justify-between", 
            { "bg-white font-bold": isSelected },
            { [classes.rootSelected]: isSelected && !isLessThan2 })}>
            <Button 
                className={classNames("p-0", isSelected ? "text-blue-500 hover:bg-transparent" : "text-black" )}
                onClick={clickHandler}>
                Page { index }
            </Button>
            <IconButton 
                className={classNames("p-0", {  "hidden": (isLessThan2 || !isSelected) } )}
                onClick={removeHandler}>
                <CloseIcon className="text-sm" />
            </IconButton>
        </li>
    );
};

export default Tab;