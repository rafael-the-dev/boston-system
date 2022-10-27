import * as React from "react";
import { Button, Hidden, Typography } from "@mui/material"
import classNames from "classnames";

import AddIcon from '@mui/icons-material/Add';

import classes from "./styles.module.css";
import { CheckoutContext } from "src/context";

import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import PaymentMethod from "./components/payment-method"

const CheckoutContainer = ({ onOpen }) => {
    const { getPaymentMethods } = React.useContext(CheckoutContext);
    const onClose = React.useRef(null);

    const closeHandler = React.useCallback(() => onClose.current?.(), []);

    const addIconMemo = React.useMemo(() => (
        <Hidden smDown>
            <AddIcon />
        </Hidden>
    ), [])

    const heaaderMemo = React.useMemo(() => (
        <DialogHeader
            classes={{ root: "bg-blue-700 pl-4 text-white" }}
            onClose={closeHandler}>
            Checkout
        </DialogHeader>
    ), [ closeHandler ])

    const clickHandler = React.useCallback(() => getPaymentMethods().add() , []);

    const methodsLength = getPaymentMethods().methods?.length;
    const restAmout = getPaymentMethods().amountRemaining();

    return (
        <Dialog
            classes={{ paper: classNames("m-0", classes.paper) }}
            onClose={onClose}
            onOpen={onOpen}>
            { heaaderMemo }
            <div className="py-8 px-5">
                {
                    methodsLength === 0 ? (
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
                        methodsLength === 0 ? "text-center" : "text-right")}>
                        { restAmout > 0 ? (methodsLength === 0 ? "Total" : "falta") : "" }
                        <span className="ml-2 text-red-500 md:text-2xl">{ restAmout }MT</span>
                    </Typography>
                </div>
                { restAmout > 0 && (<div className="flex justify-center mt-4">
                    <Button
                        className="bg-blue-500 py-3 px-4 text-white hover:bg-blue-700"
                        onClick={clickHandler}
                        startIcon={addIconMemo}>
                        Adicionar novo metodo de pagamento
                    </Button>
                </div> )}
            </div>
        </Dialog>
    );
};

export default CheckoutContainer;