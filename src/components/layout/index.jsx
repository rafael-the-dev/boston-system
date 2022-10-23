import * as React from "react";

import classes from "./styles.module.css";

//import Header from "../header";
//import Footer from "../footer";
import Menu from "../menu"

const LayoutContainer = ({ children }) => {

    return (
        <div className={classes.root}>
            <Menu />
            { children }
        </div>
    );
};


export default LayoutContainer;