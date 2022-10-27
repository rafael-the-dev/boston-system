import * as React from "react";
import { Button, Hidden, Typography } from "@mui/material"
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid";

import AddIcon from '@mui/icons-material/Add';

import classes from "./styles.module.css";
import { SaleContext } from "src/context";

import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import PaymentMethod from "./components/payment-method"

const CheckoutContainer = ({ onOpen }) => {
    const { getPaymentMethods } = React.useContext(SaleContext);
    const onClose = React.useRef(null);

    const closeHandler = React.useCallback(() => onClose.current?.(), []);

    const clickHandler = React.useCallback(() => getPaymentMethods().add() , [])

    return (
        <Dialog
            classes={{ paper: classNames("m-0", classes.paper) }}
            onClose={onClose}
            onOpen={onOpen}>
            <DialogHeader
                classes={{ root: "bg-blue-700 pl-4 text-white" }}
                onClose={closeHandler}>
                Checkout
            </DialogHeader>
            <div className="py-8 px-5">
                {
                    getPaymentMethods().methods?.length === 0 ? (
                        <Typography
                            className="font-bold mb-4 text-center text-lg md:text-2xl">
                            Sem metodos de pagamento 
                        </Typography>
                    ) : (
                        <ul className="">
                            {
                                getPaymentMethods().methods?.map(item => (
                                    <PaymentMethod { ...item } key={item.id} />
                                ))
                            }
                        </ul>
                    )
                }
                <div>
                    <Typography 
                        component="h3"
                        className={classNames("font-semibold uppercase",
                        getPaymentMethods().methods?.length === 0 ? "text-center" : "text-right")}>
                        { getPaymentMethods().methods?.length === 0 ? "Total" : "falta" }
                        <span className="ml-2 text-red-500 md:text-2xl">{ getPaymentMethods().amountRemaining() }MT</span>
                    </Typography>
                </div>
                <div className="flex justify-center mt-4">
                    <Button
                        className="bg-blue-500 py-3 px-4 text-white hover:bg-blue-700"
                        onClick={clickHandler}
                        startIcon={<Hidden smDown><AddIcon /></Hidden>}>
                        Adicionar novo metodo de pagamento
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default CheckoutContainer;