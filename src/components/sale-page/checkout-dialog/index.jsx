import * as React from "react";
import { Button, Hidden, Typography } from "@mui/material"
import classNames from "classnames";

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';

import classes from "./styles.module.css";
import { CheckoutContext } from "src/context";

import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import PaymentMethod from "./components/payment-method"

const CheckoutContainer = ({ onOpen }) => {
    const { getPaymentMethods } = React.useContext(CheckoutContext);
    const [ loading, setLoading ] = React.useState(false);

    const onClose = React.useRef(null);

    const closeHandler = React.useCallback(() => onClose.current?.(), []);

    const addIconMemo = React.useMemo(() => (
        <Hidden smDown>
            <AddIcon />
        </Hidden>
    ), []);

    const backButtonMemo = React.useMemo(() => (
        <Button
            className="border-red-500 mr-4 text-red-500 hover:bg-red-500 py-2 px-4 hover:border-red-500 hover:text-white"
            onClick={closeHandler}
            startIcon={<ArrowBackIcon />}
            variant="outlined">
            Voltar
        </Button>
    ), [])

    const heaaderMemo = React.useMemo(() => (
        <DialogHeader
            classes={{ paper: classes.paper, root: "bg-blue-700 pl-4 text-white" }}
            onClose={closeHandler}>
            Checkout
        </DialogHeader>
    ), [ closeHandler ])

    const clickHandler = React.useCallback(() => getPaymentMethods().add() , []);

    const methodsLength = getPaymentMethods().methods?.length;
    const restAmout = getPaymentMethods().amountRemaining();

    const submitHandler = async () => {
        setLoading(true);

        const options = {
            body: JSON.stringify(getPaymentMethods().toLiteral()),
            headers: {
                "Authorization": JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token
            },
            method: "POST"
        };

        try {
            const res = await fetch("/api/sales", options);
            console.log(res)
        } catch(e) {
            console.error(e);
        }

        setLoading(false);
    };

    return (
        <Dialog
            classes={{ paper: classNames("m-0", classes.paper) }}
            onClose={onClose}
            onOpen={onOpen}>
            { heaaderMemo }
            <div className={classNames(classes.content, "flex flex-col items-stretch justify-between py-8 px-5")}>
                <div className="">
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
                { restAmout === 0 && <div className="flex justify-end">
                    { backButtonMemo }
                    <Button
                        className="bg-blue-700 py-2 px-4 text-white hover:bg-blue-500"
                        onClick={submitHandler}
                        startIcon={<DoneIcon />}
                        variant="contained">
                        { loading ? "Loading..." : "Concluir" }
                    </Button>
                </div> }
            </div>
        </Dialog>
    );
};

export default CheckoutContainer;