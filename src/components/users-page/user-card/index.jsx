import classNames from "classnames";
import { Button, Chip, Typography } from "@mui/material";

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import classes from "./styles.module.css";

import Image from "src/components/default-image";
import Link from "src/components/link"

const Card = ({ category, firstName, image, lastName, username }) => {
    const fullName = `${firstName} ${lastName}`;

    return (
        <div className={classNames("border border-solid border-stone-200 items-stretch mb-6 sm:flex")}>
            <div className={classNames(classes.imageContainer, "relative")}>
                <Image 
                    alt={fullName}
                    layout='fill'
                    src={`/images/users/${image}`}
                />
            </div>
            <div className="flex flex-col justify-between px-3 py-4 sm:grow">
                <div>
                    <Typography
                        component="h2">
                        { fullName }
                    </Typography>
                </div>
                <div className="flex items-center justify-between w-full">
                    <Chip 
                        label={category} 
                    />
                    <Link href={`profile/${username}`}>
                        <Button
                            className="bg-blue-500 capitalize py-2 px-3 text-white hover:bg-blue-700"
                            endIcon={<ArrowRightAltIcon />}
                            variant="contained">
                            View profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;