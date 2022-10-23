import { Breadcrumbs, Hidden, IconButton } from "@mui/material"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Avatar from "./components/avatar";
import Menu from "src/components/menu"

const Header = () => {

    return (
        <header className="flex items-center justify-between px-5 py-2">
            <div>
                <Hidden lgUp>
                    <Menu />
                </Hidden>
                <Hidden smDown>
                    <IconButton className="p-0 hover:bg-transparent">
                        <ArrowBackIcon />
                    </IconButton>
                    <Breadcrumbs></Breadcrumbs>
                </Hidden>
            </div>
            <div>
                <Avatar />
            </div>
        </header>
    );
};

export default Header;