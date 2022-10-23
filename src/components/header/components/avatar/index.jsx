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
                    src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F002%2F403%2Foriginal%2Fman-with-beard-avatar-character-isolated-icon-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fhuman-avatar&tbnid=MV9dWdy0ZY_UPM&vet=12ahUKEwib9oyH2_X6AhVJZRoKHdanC6sQMygcegUIARCPAg..i&docid=MSzOgmpmesXuDM&w=7973&h=7974&q=avatar%20icon%20&ved=2ahUKEwib9oyH2_X6AhVJZRoKHdanC6sQMygcegUIARCPAg"
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