import * as React from "react";
import Hidden from "@mui/material/Hidden"

import classes from "./styles.module.css";

import Header from "../header";
//import Footer from "../footer";
import Menu from "../menu"

const LayoutContainer = ({ children }) => {

    return (
        <div className={classes.root}>
            <Hidden lgDown>
                <Menu />
            </Hidden>
            <div>
                <Header />
                { children }
            </div>
        </div>
    );
};


export default LayoutContainer;