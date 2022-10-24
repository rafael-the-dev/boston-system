import Button from "@mui/material/Button"
import classNames from "classnames";

const Container = ({ children, classes, className, disabled, onClick }) => {

    return (
        <li className={classNames("", classes?.root)}>
            <Button
                className={classNames(`flex items-center justify-between py-3 px-3 rounded-none w-full 
                hover:bg-stone-200`, classes?.button)}
                disabled={Boolean(disabled)}
                onClick={onClick}>
                { children }
            </Button>
        </li>
    );
};

export default Container;