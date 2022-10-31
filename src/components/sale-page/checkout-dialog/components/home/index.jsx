import * as React from "react";
import { Button, Hidden, Typography } from "@mui/material"
import classNames from "classnames";

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';

import { CheckoutContext } from "src/context";

import PaymentMethod from "../payment-method"

const CheckoutContainer = ({ onClose, setPanel }) => {
    const { getPaymentMethods } = React.useContext(CheckoutContext);
    const [ loading, setLoading ] = React.useState(false);

    const onOpenErrorDialog = React.useRef(null);

    const addIconMemo = React.useMemo(() => (
        <Hidden smDown>
            <AddIcon />
        </Hidden>
    ), []);

    const backButtonMemo = React.useMemo(() => (
        <Button
            className="border-red-500 mr-4 text-red-500 hover:bg-red-500 py-2 px-4 hover:border-red-500 hover:text-white"
            onClick={onClose}
            startIcon={<ArrowBackIcon />}
            variant="outlined">
            Voltar
        </Button>
    ), [])

    const clickHandler = React.useCallback(() => getPaymentMethods().add() , []);

    const methodsLength = getPaymentMethods().methods?.length;
    const restAmout = getPaymentMethods().amountRemaining();
    const clientChange = getPaymentMethods().getClientChange();

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
            await fetch("/api/sales", options);
            setLoading(false);
            setPanel("SUCCESSFULPAYMENT")
        } catch(e) {
            console.error(e);
            onOpenErrorDialog.current?.();
        }

        setLoading(false);
    };

    return (
        <div className={classNames("flex flex-col h-full items-stretch justify-between py-8 px-5")}>
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
                        { restAmout > 0 && <Typography 
                            component="div"
                            className={classNames("font-semibold uppercase",
                            methodsLength === 0 ? "text-center" : "text-right")}>
                            { restAmout > 0 ? (methodsLength === 0 ? "Total" : "falta") : "" }
                            <span className="ml-2 text-red-500 md:text-2xl">{ restAmout }MT</span>
                        </Typography> }
                        { clientChange > 0 && <Typography
                            component="div"
                            className={classNames("font-semibold text-right uppercase")}>
                            Trocos
                            <span className="ml-2 text-yellow-500 md:text-2xl">{ clientChange }MT</span>
                        </Typography>}
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
    );
};

export default CheckoutContainer;