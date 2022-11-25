import Button from "@mui/material/Button";
import classNames from "classnames";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Link from "../link";

const CancelLink = ({ children, classes, href, hideIcon }) => (
    <Link 
        className={classNames(classes?.root)}
        href={href}>
        <Button 
            className={classNames(`border-red-500 text-red-500 sm:py-2 hover:bg-red-500 
            hover:border-red-500 hover:text-white`, classes?.button)}
            startIcon={<ArrowBackIcon className={classNames({ "hidden": Boolean(hideIcon)})} />}
            type="button"
            variant="outlined">
            { children ?? "Cancelar" }
        </Button>
    </Link>
);

export default CancelLink;