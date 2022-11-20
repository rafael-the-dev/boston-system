import classNames from "classnames";
import { Typography } from "@mui/material";

import classes from "./styles.module.css";

import Image from "src/components/default-image";

const Card = ({ firstName, image, lastName, username }) => {
    const fullName = `${firstName} ${lastName}`;

    return (
        <div className={classNames("border border-solid border-stone-200 mb-6")}>
            <div className={classNames(classes.imageContainer, "relative")}>
                <Image 
                    alt={fullName}
                    layout='fill'
                    src={`/images/users/${image}`}
                />
            </div>
            <div className="px-3 py-4">
                <Typography
                    component="h2">
                    { fullName }
                </Typography>
            </div>
        </div>
    );
};

export default Card;