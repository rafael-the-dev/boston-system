import * as React from "react";
import classNames from "classnames";
import { Hidden, SpeedDial } from "@mui/material";

import classes from "./styles.module.css";

import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import Container from "./components/container";
import Drawer from "src/components/Drawer";


const Menu = () => {
    const onClickRef = React.useRef(null);
    const onCloseRef = React.useRef(null);

    const clickHandler = () => onClickRef.current?.();

    return (
        <>
            <Hidden lgDown>
                <Container />
            </Hidden>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    classes={{ 
                        paper: classNames(classes.dialogPaper, "h-full m-0 max-h-full rounded-none"),
                        scrollPaper: "justify-start"
                    }}
                    id="menu"
                    onOpen={onClickRef}
                    onClose={onCloseRef}>
                    <Container />
                </Drawer>
            </Hidden>
            <SpeedDial
                ariaLabel="menu button"
                onClick={clickHandler}
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            />
        </>
    );
};

export default Menu;