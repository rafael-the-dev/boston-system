import { Typography} from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimelineIcon from '@mui/icons-material/Timeline';

import Link from "src/components/link";
import ListItem from "../list-item";

const Container = () => {
    return (
        <aside className="bg-blue-800 h-screen">
            <div className="bg-blue-500 px-5 py-4">
                <Link 
                    className="text-lg sm:text-xl md:text-2xl text-white uppercase"
                    href="/">
                    Logo
                </Link>
            </div>
            <ul className="py-3">
                <ListItem href="/">
                    <HomeIcon /> Home
                </ListItem>
                <ListItem href="/payments">
                    <PaidIcon /> Pagamentos
                </ListItem>
                <ListItem href="/reports">
                    <ReceiptLongIcon /> Relatorios
                </ListItem>
                <ListItem href="/management">
                    <TimelineIcon /> Gerenciamento
                </ListItem>
            </ul>
        </aside>
    );
};

export default Container;