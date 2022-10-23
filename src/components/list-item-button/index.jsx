import Button from "@mui/material/Button"
import classNames from "classnames";

const Container = ({ children, classes, className, onClick }) => {

    return (
        <li className={classNames("", classes?.root)}>
            <Button
                className={classNames(classes?.button, `flex items-center justify-between py-3 px-3 rounded-none w-full hover:bg-stone-200`)}>
                { children }
            </Button>
        </li>
    );
};

export default Container;