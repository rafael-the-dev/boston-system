import * as React from "react";
import { Breadcrumbs, Hidden, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import classNames from "classnames"

import classes from "./styles.module.css"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { LoginContext } from "src/context";

import Avatar from "./components/avatar";
import Menu from "src/components/menu";
import Title from "../title"

const Header = () => {
    const { loggedUser } = React.useContext(LoginContext);

    const router = useRouter();
    const { pathname } = router;

    const isDynamicTitlePaths = () => {
        return [ "/sale", "/reports" ].includes(pathname);
    };

    const dynamicTitle = () => {
        return {
            "/reports": "Sales Reports",
            "/sale": "New sale"
        }[pathname]
    };

    if([ "/sign-up", "/login" ].includes(pathname)) return <></>;

    return (
        <header className="flex items-center justify-between px-5 py-2">
            <div className="flex items-center">
                <Hidden lgUp>
                    <Menu />
                </Hidden>
                { isDynamicTitlePaths() && <Title className={classNames('ml-3', classes.salesTitle)}>{ dynamicTitle() }</Title> }
                <Hidden xlDown>
                    <IconButton className="p-0 hover:bg-transparent">
                        <ArrowBackIcon />
                    </IconButton>
                    <Breadcrumbs></Breadcrumbs>
                </Hidden>
            </div>
            <div className="flex items-center">
                <Hidden smDown>
                    <Typography
                        className="mr-3">{ loggedUser.lastName }, { loggedUser.firstName }</Typography>
                </Hidden>
                <Avatar />
            </div>
        </header>
    );
};

export default Header;