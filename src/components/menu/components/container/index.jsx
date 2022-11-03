import { Typography} from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimelineIcon from '@mui/icons-material/Timeline';

import Link from "src/components/link";
import ListItem from "../list-item";

const Container = () => {
    return (
        <aside className={classNames(classes.container, "bg-blue-800 h-screen")}>
            <div className="bg-blue-500 px-5 py-4 lg:py-3">
                <Link 
                    className="text-lg sm:text-xl md:text-2xl text-white uppercase"
                    href="/">
                    Logo
                </Link>
            </div>
            <ul className="py-3 lg:pt-6">
                <ListItem href="/">
                    <HomeIcon /> Home
                </ListItem>
                <ListItem href="/sales">
                    <ShoppingCartIcon /> Sales
                </ListItem>
                <ListItem>
                    <ReceiptLongIcon /> Reports
                </ListItem>
                <ListItem>
                    <PaidIcon /> Payments
                </ListItem>
                <ListItem>
                    <TimelineIcon /> Management
                </ListItem>
            </ul>
        </aside>
    );
};

export default Container;