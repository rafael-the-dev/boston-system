import { useCallback, useContext, useRef, useMemo, useState } from "react"
import { Button, Typography } from "@mui/material";
import { v4 as uuidV4 } from "uuid";
import classNames from "classnames";

import classes from "./styles.module.css";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import { getCategories, getProducts } from "src/helpers/queries"
import { LoginContext, SaleContext } from "src/context";;
import Product from "src/models/Product"

import Checkout from "src/components/sale-page/checkout-dialog"
import Input from "src/components/default-input";
import Link from "src/components/link"
import Table from "src/components/table";
import { AddProductButton, CartTable, SearchField } from "src/components/sale-page";  

export const getServerSideProps = async () => {
    const [ categories, productsList ] = await Promise.all([ getCategories(), getProducts() ]);

    return {
        props: {
            categories, 
            productsList
        }, // will be passed to the page component as props
    }
};


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
        <Checkout onOpen={onOpenDialog} />
    ), [])

    const homeLinkMemo = useMemo(() => (
        <Link href="/">
            <Button
                className="border-blue-500 py-3 sm:px-8 text-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                startIcon={<ArrowBackIcon />}
                variant="outlined">
                Sair
            </Button>
        </Link>
    ), []);

    const paymentButtonMemo = useMemo(() => (
        <Button
            className={classNames(classes.paymentButton, `bg-gray-700 font-bold rounded-none 
            md:text-lg xl:text-xl text-white hover:bg-blue-500`)}
            type="submit">
            {loading ? "Loading..." : `Pagar ${  getCart() ? getCart().total : 0}MT` }
        </Button>
    ), [ cart, getCart, loading ])

    const resetCartButtonMemo = useMemo(() => (
        <Button
            className="border-red-600 ml-3 py-3 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white"
            onClick={resetHandler}
            startIcon={<DeleteIcon />}
            variant="outlined">
            Limpar carrinho
        </Button>
    ), [ resetHandler ]);

    const totalPanel = useMemo(() => (
        <div className="flex flex-col items-end">
            <Typography>
                Total
                <span className="font-bold ml-3 text-3xl">{ getCart() ? getCart().total : 0 }MT</span>
            </Typography>
        </div>
    ), [ cart, getCart ])

    const resetHandler = useCallback(() => getCart().reset(), [])

    const submitHandler = useCallback((e) => {
        e.preventDefault();

        if(cart.length === 0) return;

        onOpenDialog.current?.();
        /*setLoading(true);

        const options = {
            body: JSON.stringify({
                state: "ATIVO",
                username: loggedUser.username
            }),
            method: "POST"
        };

        fetch('api/sales', options)
            .then(() => setLoading(false))
            .catch(err => {
                console.log(err);
                setLoading(false);
            })*/
    }, [ cart, loggedUser ])

    return (
        <main className={classNames(classes.main, `bg-stone-100 grow`)}>
            <section className="h-full">
                <form
                    className="flex flex-col h-full items-stretch justify-between"
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