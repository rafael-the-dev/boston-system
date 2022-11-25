import Paper from "@mui/material/Paper"
import classNames from "classnames";

import classes from "./styles.module.css";

const Container = ({ children, component, className }) => (
    <Paper
        className={classNames("bg-transparent flex flex-col justify-between px-5 py-8 xl:px-8 rounded-none",
            classes.root, className)}
        component={ component ?? "div" }>
        { children }
    </Paper>
);

export default Container;