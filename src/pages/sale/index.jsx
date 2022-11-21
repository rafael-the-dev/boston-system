import { useCallback, useContext, useEffect, useRef, useMemo, useState } from "react"
import { Button, Typography } from "@mui/material";
import * as cookie from "cookie"
import { v4 as uuidV4 } from "uuid";
import classNames from "classnames";

import classes from "./styles.module.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import { CheckoutContextProvider, LoginContext, SaleContext } from "src/context";
import Product from "src/models/Product";
//import SerialPort from "src/models/client/SerialPort";

import Checkout from "src/components/sale-page/checkout-dialog"
import Input from "src/components/default-input";
import Link from "src/components/link"
import Table from "src/components/table";
import { AddProductButton, CartTable, SearchField } from "src/components/sale-page";  

// server side render products and categories
export { getProductsAndCategories as getStaticProps } from "src/helpers/server-side";

const Container = ({ categories, productsList }) => {
    const { loggedUser } = useContext(LoginContext);
    const { cart, getCart } = useContext(SaleContext);

    const [ barCode, setBarCode ] = useState("")
    const [ loading, setLoading ] = useState(false);

    const onOpenDialog = useRef(null);

    const products = useMemo(() => productsList.map(product => new Product(product)), [ productsList ])

    const addProductButtonMemo = useMemo(() => (
        <AddProductButton 
            categories={categories} 
            products={products}
        />
    ), [ categories, products ])
    
    const barCodeInputMemo = useMemo(() => (
        <SearchField
            products={products}
        />
    ), [ products ]);

    const cartTableMemo = useMemo(() => <CartTable />, [])

    const checkoutDialogMemo = useMemo(() => (
        <CheckoutContextProvider>
            <Checkout onOpen={onOpenDialog} />
        </CheckoutContextProvider>
    ), [])

    const homeLinkMemo = useMemo(() => (
        <Link href="/">
            <Button
                className="border-blue-500 py-3 sm:px-8 text-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                startIcon={<ArrowBackIcon />}
                variant="outlined">
                Back
            </Button>
        </Link>
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
        <Button
            className="border-red-600 ml-3 py-3 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white"
            onClick={resetHandler}
            startIcon={<DeleteIcon />}
            variant="outlined">
            Reset
        </Button>
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

        if(cart.length === 0) return;

        onOpenDialog.current?.();
    }, [ cart ]);

    /*useEffect(() => {
        const serialPort = new SerialPort();
    }, [])*/

    return (
        <main className={classNames(classes.main, `bg-stone-100 grow`)}>
            <section className="h-full">
                <form
                    className="flex flex-col h-full items-stretch justify-between"
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
                        <div className="flex items-end justify-between px-5 py-4">
                            <div>
                                { homeLinkMemo }
                                {
                                    cart.length > 0 && resetCartButtonMemo
                                }
                            </div>
                            { totalPanel }
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
            </section>
        </main>
    );
};

export default Container;