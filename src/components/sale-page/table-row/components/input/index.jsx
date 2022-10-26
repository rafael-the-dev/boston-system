import * as React from "react";
import { IconButton } from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import { SaleContext } from "src/context"

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Container = ({ cartItem, quantity }) => {
    const { getCart } = React.useContext(SaleContext); //

    const decrement = () => {
        getCart().decrementQuantity(cartItem.product.id)
    }

    const increment = () => {
        getCart().incrementQuantity(cartItem.product.id)
    };

    const changeHandler = (e) => {
        getCart().addQuantity(cartItem.product.id, parseInt(e.target.value));
    };

    return (
        <div className="flex items-center justify-center">
            <IconButton 
                className="p-0 text-sm"
                onClick={increment}>
                <AddIcon className="text-base" />
            </IconButton>
            <input 
                className={classNames(classes.input, "bg-transparent border-0 text-center outline-none")}
                min={1}
                onChange={changeHandler}
                type="number"
                value={quantity}
            />
            <IconButton 
                className="p-0 text-sm"
                onClick={decrement}>
                <RemoveIcon className="text-base" />
            </IconButton>
        </div>
    );
};

export default Container;