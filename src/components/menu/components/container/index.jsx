import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimelineIcon from '@mui/icons-material/Timeline';

import Link from "src/components/link";
import ListItem from "../list-item";

const Container = () => {
    const [ close, setClose ] = React.useState(false);

    const toggle = React.useCallback(() => setClose(b => !b), []);

    return (
        <aside className={classNames(classes.container, { [classes.containerClose]: close }, 
            "bg-blue-800 flex flex-col h-screen justify-between")}>
            <div>
                <div className="bg-blue-500 px-5 py-4 lg:py-3">
                    <Link 
                        className="text-lg sm:text-xl md:text-2xl text-white uppercase"
                        href="/">
                        Logo
                    </Link>
                </div>
                <ul className="py-3 lg:pt-6">
                    <ListItem href="/">
                        <HomeIcon /> { !close && "Home"}
                    </ListItem>
                    <ListItem href="/sales">
                        <ShoppingCartIcon /> { !close && "Sales" }
                    </ListItem>
                    <ListItem href="/stocks">
                        <ReceiptLongIcon /> { !close && "Stocks" }
                    </ListItem>
                    <ListItem href="/payments">
                        <PaidIcon /> { !close && "Payments" }
                    </ListItem>
                    <ListItem>
                        <TimelineIcon /> { !close && "Management" }
                    </ListItem>
                </ul>
            </div>
            <IconButton 
                className={classNames(classes.toggleButton, { [classes.toggleButtonClose]: close },
                "bg-stone-300 hidden text-blue-700 hover:bg-stone-400 xl:flex")}
                onClick={toggle}>
                { close ? <ArrowForwardIcon /> : <ArrowBackIcon /> }
            </IconButton>
        </aside>
    );
};

export default Container;