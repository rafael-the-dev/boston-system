import Button from "@mui/material/Button";
import classNames from "classnames";

import Link from "../link";

const PrimaryButton = ({ children, classes, href, variant, ...rest }) => {

    const newVariant = variant ?? "contained"
    
    const button = (
        <Button
            className={classNames("py-2", 
                newVariant === "contained" ? "bg-blue-500 text-white hover:bg-blue-700" : "border border-solid border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white", 
                classes?.button
            )}
            variant={newVariant}
            { ...rest }>
            { children }
        </Button>
    );

    return href ? <Link className={classes?.link} href={href}>{ button }</Link> : button;
};

export default PrimaryButton;