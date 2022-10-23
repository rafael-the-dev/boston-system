import * as React from "react";
import { Avatar, IconButton } from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

import ListItem from "src/components/list-item-button"
import Popover from "src/components/popover";


const Container = () => {
    const onOpen = React.useRef(null);

    const clickHandler = e => onOpen.current?.(e);
    
    return (
        <>
            <IconButton
                className="p-0"
                onClick={clickHandler}>
                <Avatar 
                    alt=""
                    className={classNames(classes.avatar)}
                    src="https://xsgames.co/randomusers/avatar.php?g=male"
                />
            </IconButton>
            <Popover
                id="user"
                onClickRef={onOpen}>
                <ul className={classes.list}>
                    <ListItem classes={{ button: "capitalize" }}>
                        <PersonIcon />
                        Perfil
                    </ListItem>
                    <ListItem classes={{ button: "capitalize" }}>
                        <LogoutIcon />
                        Sair
                    </ListItem>
                </ul>
            </Popover>
        </>
    );
};

export default Container;