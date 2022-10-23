import * as React from "react";
import { Avatar, IconButton } from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import Popover from "src/components/popover";


const Container = () => {

    return (
        <>
            <IconButton
                className="p-0">
                <Avatar 
                    alt=""
                    className={classNames(classes.avatar)}
                    src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F002%2F403%2Foriginal%2Fman-with-beard-avatar-character-isolated-icon-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fhuman-avatar&tbnid=MV9dWdy0ZY_UPM&vet=12ahUKEwib9oyH2_X6AhVJZRoKHdanC6sQMygcegUIARCPAg..i&docid=MSzOgmpmesXuDM&w=7973&h=7974&q=avatar%20icon%20&ved=2ahUKEwib9oyH2_X6AhVJZRoKHdanC6sQMygcegUIARCPAg"
                />
            </IconButton>
        </>
    );
};

export default Container;