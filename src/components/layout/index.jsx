import * as React from "react";
import classNames from "classnames";
import Hidden from "@mui/material/Hidden"

import classes from "./styles.module.css";

import Header from "../header";
//import Footer from "../footer";
import Menu from "../menu"

const LayoutContainer = ({ children }) => {

    return (
        <div className={classNames(classes.root, `xl:flex xl:h-screen`)}>
            <Hidden lgDown>
                <Menu />
            </Hidden>
            <div className={classNames(classes.main, "overflow-y-auto")}>
                <Header />
                { children }
            </div>
        </div>
    );
};


export default LayoutContainer;