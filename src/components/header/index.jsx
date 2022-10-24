import * as React from "react";
import { Breadcrumbs, Hidden, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { LoginContext } from "src/context";

import Avatar from "./components/avatar";
import Menu from "src/components/menu"

const Header = () => {
    const { loggedUser } = React.useContext(LoginContext);

    const { pathname } = useRouter();
    if([ "/sign-up", "/login" ].includes(pathname)) return <></>;

    return (
        <header className="flex items-center justify-between px-5 py-2">
            <div>
                <Hidden lgUp>
                    <Menu />
                </Hidden>
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