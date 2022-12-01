import { useCallback, useContext, useEffect, useRef, useMemo, useState } from "react"
import { Button, Typography } from "@mui/material";
import { v4 as uuidV4 } from "uuid";
import classNames from "classnames";

import classes from "./styles.module.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import { CheckoutContextProvider, LoginContext, SaleContext, SaleTabsContext } from "src/context";

import Checkout from "src/components/sale-page/checkout-dialog";
import CancelButton from "src/components/cancel-link";
import Input from "src/components/default-input";
import Link from "src/components/link"
import PrimaryButton from "src/components/primary-button"
import Table from "src/components/table";
import { AddProductButton, CartTable, SearchField } from "src/components/sale-page";  


const Container = ({ tabId }) => {
    const { loggedUser } = useContext(LoginContext);
    const { cart, getCart, hasQuantityError } = useContext(SaleContext);
    const { getCurrentTab } = useContext(SaleTabsContext);

    const [ barCode, setBarCode ] = useState("")
    const [ loading, setLoading ] = useState(false);

    const onOpenDialog = useRef(null);

    const addProductButtonMemo = useMemo(() => <AddProductButton />, []);
    
    const barCodeInputMemo = useMemo(() => <SearchField />, []);

    const cartTableMemo = useMemo(() => <CartTable />, [])

    const checkoutDialogMemo = useMemo(() => (
        <CheckoutContextProvider>
            <Checkout onOpen={onOpenDialog} />
        </CheckoutContextProvider>
    ), [ ])

    const homeLinkMemo = useMemo(() => (
        <CancelButton href="/">
            Back
        </CancelButton>
    ), []);
    
    const paymentButtonMemo = useMemo(() => (
        <Button
            className={classNames(classes.paymentButton, `bg-gray-700 font-bold rounded-none 
            md:text-lg xl:text-xl text-white hover:bg-blue-500`)}
            type="submit">
            {loading ? "Loading..." : `Pay ${  getCart() ? getCart().total : 0}MT` }
        </Button>
    ), [ getCart, loading ]);

    const resetHandler = useCallback(() => getCart().reset(), [ getCart ])

    const resetCartButtonMemo = useMemo(() => (
        <PrimaryButton
            classes={{ button: "ml-3" }}
            onClick={resetHandler}
            startIcon={<DeleteIcon />}
            variant="outlined">
            Reset
        </PrimaryButton>
    ), [ resetHandler ]);

    const totalPanel = useMemo(() => (
        <div className="flex flex-col items-end">
            <Typography>
                Total
                <span className="font-bold ml-3 text-3xl">{ getCart() ? getCart().total : 0 }MT</span>
            </Typography>
        </div>
    ), [ getCart ]);

    const keydownHandler = useCallback((e) => {
        //
        if(e.key.toLowerCase() === "enter") e.preventDefault();
    }, [])

    const submitHandler = useCallback((e) => {
        e.preventDefault();

        if(cart.length === 0 || hasQuantityError) return;

        onOpenDialog.current?.();
    }, [ cart, hasQuantityError ]);

    return (
        <form
            className={classNames("flex-col h-full items-stretch justify-between",
            getCurrentTab() === tabId ? "flex" : "hidden")}
            onKeyDown={keydownHandler}
            onSubmit={submitHandler}>
            <div className="px-5">
                <div className="flex flex-wrap justify-between pt-4">
                    { barCodeInputMemo }
                    { addProductButtonMemo }
                </div>
                { cartTableMemo }
            </div>
            <div>
                <div className="bg-stone-100 flex flex-col items-end justify-between px-5 py-4 sm:flex-row-reverse">
                    { totalPanel }
                    <div className="flex mt-4 sm:mt-0">
                        { homeLinkMemo }
                        {
                            cart.length > 0 && resetCartButtonMemo
                        }
                    </div>
                </div>
                <div className="bg-gray-200 flex items-center justify-between">
                    <Typography>
                        { loggedUser.Username }
                    </Typography>
                    { paymentButtonMemo }
                </div>
            </div>
            { checkoutDialogMemo }
        </form>
    );
};

export default Container;