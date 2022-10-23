import { useRouter } from "next/router";
import classNames from "classnames";

import classes from "./styles.module.css";

import ListItem from "src/components/list-item-button"


const Container = ({ children, href }) => {

    const { pathname } = useRouter();
    console.log(pathname, href)

    return (
        <ListItem classes={{ button: classNames(classes.listItem, 
        { [classNames(classes.listItemSelected, "bg-stone-300")]: pathname === href },
        pathname === href ? "text-blue-800" : "text-stone-300" ) }}>
            { children }
        </ListItem>
    );
};

export default Container;