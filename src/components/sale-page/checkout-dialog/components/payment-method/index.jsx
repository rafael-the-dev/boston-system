import * as React from "react";
import { IconButton, MenuItem } from "@mui/material"
import { v4 as uuidV4 } from "uuid";
import classNames from "classnames"

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import classes from "./styles.module.css";

import { CheckoutContext } from "src/context"

import Input from "src/components/default-input";

const PaymentMethodContainer = ({ id, value, amount }) => {

    const { getPaymentMethods } = React.useContext(CheckoutContext);

    const methods = [
        { value: "cash", label: "Cash" },
        { value: "m-pesa", label: "M-pesa" },
        { value: "e-mola", label: "E-mola" },
        { value: "m-kesh", label: "M-kesh" },
        { value: "credit-cart", label: "Credit Card" }
    ];
    
    const filter = (item) => {
        if(item.value === value) return true;

        return !Boolean(getPaymentMethods().methods.find(method => {
            return method.value === item.value
        }));
    };

    const changeHandler = (e) => {
        const newAmout = e.target.value.trim();
        
        getPaymentMethods().addAmout(id, parseFloat(newAmout));
    };

    const changeMethodHandler = (e) => {
        const newMethod = e.target.value;
        
        getPaymentMethods().changeMethod(id, newMethod);
    };

    const clearRemaingAmount = () => {
        getPaymentMethods().clearRemaingAmount(id);
    };

    const removeHandler = () => getPaymentMethods().remove(id);

    return (
        <li>
            <form className="flex items-center justify-between w-full">
                <Input
                    className={classNames(classes.select)}
                    label="Metodo de pagamento"
                    onChange={changeMethodHandler}
                    select
                    value={value}
                    variant="outlined"
                    >
                    {
                        methods
                            .filter(filter)
                            .map(item => (
                            <MenuItem key={item.value} value={item.value}>
                                { item.label }
                            </MenuItem>
                        ))
                    }
                </Input>
                <Input 
                    className={classes.input}
                    label="Insere o valor"
                    onChange={changeHandler}
                    value={amount}
                    variant="outlined"
                />
                <div className="flex">
                    { getPaymentMethods().amountRemaining() > 0 && (
                        <IconButton 
                            className="text-blue-500 hover:text-blue-700"
                            onClick={clearRemaingAmount}>
                            <CheckCircleIcon />
                        </IconButton>
                    )}
                    <IconButton 
                        className="hover:text-red-600" 
                        onClick={removeHandler}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </form>
        </li>
    );
};

export default PaymentMethodContainer;