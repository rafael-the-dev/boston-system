import * as React from "react";
import classNames from "classnames";
import Hidden from "@mui/material/Hidden";
import { useRouter } from "next/router"

import classes from "./styles.module.css";

import Header from "../header";
//import Footer from "../footer";
import Menu from "../menu"

const LayoutContainer = ({ children }) => {
    const { pathname } = useRouter();

    return (
        <div className={classNames(classes.root, `xl:flex xl:h-screen`)}>
            <Hidden lgDown>
                <Menu />
            </Hidden>
            <div className={classNames("overflow-y-auto",
                [ "/sign-up", "/login" ].includes(pathname) ? "w-full" : classes.main)}>
                <Header />
                { children }
            </div>
        </div>
    );
};


export default LayoutContainer;