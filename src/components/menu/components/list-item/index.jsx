import { useRouter } from "next/router";
import classNames from "classnames";

import classes from "./styles.module.css";

import ListItem from "src/components/list-item-button"


const Container = ({ children, href }) => {

    const router = useRouter();
    const { pathname } = router;

    const clickHandler = () => {
        Boolean(href) && router.push(href);
    };

    return (
        <ListItem classes={{ button: classNames(classes.listItem, "hover:text-blue-800",
        { [classNames(classes.listItemSelected, "bg-stone-300")]: pathname === href },
        pathname === href ? "text-blue-800" : "text-stone-300" ) }}
        onClick={clickHandler}>
            { children }
        </ListItem>
    );
};

export default Container;