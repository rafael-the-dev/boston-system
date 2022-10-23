import Typography from "@mui/material/Typography"
import classNames from "classnames";

import classes from "./styles.module.css";

import Link from "src/components/link"

const Card = ({ color, href, title }) => {

    return (
        <Link
            className={classNames(classes.card, "mb-4")}
            href={href}>
            <div 
                className="h-full"
                style={{ backgroundColor: color }}>
                <Typography>
                    { title }
                </Typography>
            </div>
        </Link>
    );
};

export default Card;