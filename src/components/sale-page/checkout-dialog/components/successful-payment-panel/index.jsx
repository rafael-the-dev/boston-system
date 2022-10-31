import * as React from "react";
import Button from "@mui/material/Button";

import classes from "./styles.module.css"

import { CheckoutContext } from "src/context";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrintIcon from '@mui/icons-material/Print';

const SuccessfulPaymentPanel = ({ onClose }) => {
    const { getPaymentMethods } = React.useContext(CheckoutContext);

    const closeHandler = () => {
        getPaymentMethods().cart.reset();
        getPaymentMethods().reset();
        onClose();
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex grow items-center justify-center">
                <CheckCircleIcon className={classes.icon} />
            </div>
            <div className="flex justify-end p-4">
                <Button 
                    className='border-blue-500 text-blue-500 mr-3 hover:bg-blue-500 hover:text-white'
                    variant="outlined"
                    startIcon={<PrintIcon />}>
                    Print
                </Button>
                <Button
                    className="bg-red-500 py-4 px-8 text-white hover:bg-red-700"
                    onClick={closeHandler}
                    variant="contained">
                    Close
                </Button>
            </div>
        </div>
    );
};

export default SuccessfulPaymentPanel;