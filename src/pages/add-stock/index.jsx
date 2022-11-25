import * as React from "react";
import { Button, Paper, Typography } from "@mui/material"
import classNames from "classnames";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SaveIcon from '@mui/icons-material/Save';

import classes from "./styles.module.css";

import { AddStockContext } from "src/context";

import Input from "src/components/default-input";
import Link from "src/components/link";
import Main from "src/components/main";
import MessageDialog from "src/components/message-dialog";
import Panel from "src/components/panel";

import { AddProduct, NewStockList, StockProviders } from "src/components/add-stock-page";

const Container = () => {
    const { reset, toLiteral } = React.useContext(AddStockContext);

    const [ loading, setLoading ] = React.useState(false);

    const hasErrorsRef = React.useRef(false);

    const addProductMemo = React.useMemo(() => <AddProduct />, []);
    const newStockListMemo = React.useMemo(() => <NewStockList />, []);
    const stockProvidersMemo = React.useMemo(() => <StockProviders />, []);

    const homeMemo = React.useMemo(() => (
        <Link href="/stocks">
            <Button
                className="bg-red-600 py-2 text-white hover:bg-red-800 "
                startIcon={<KeyboardBackspaceIcon />}
                variant='contained'>
                Voltar
            </Button>
        </Link>
    ), []);
    
    const setMessageDialog = React.useRef(null);

    const closeHelper = React.useCallback(() => {
        if(hasErrorsRef.current) return;

        reset();
    }, [ reset ])

    const messageDialogMemo = React.useMemo(() => (
        <MessageDialog 
            closeHelper={closeHelper}
            setDialogMessage={setMessageDialog}
        />
    ), [ closeHelper ])
    
    const clickHandler = async () => {
        if(loading) return;

        setLoading(true);
        hasErrorsRef.current = false;

        const options = {
            body: JSON.stringify(toLiteral),
            headers: {
                "Authorization": JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token
            },
            method: "POST"
        };

        try {
            const res = await fetch("/api/stock-providers-invoices", options);
            const { status } = res;
            
            if(status >= 300 || status < 200) {
                throw new Error();
            }

            setMessageDialog.current?.({
                description: "Adicionado com successo",
                title: "Sucesso",
                type: "success"
            });
            setLoading(false);
        } catch(e) {
            console.error(e);
            hasErrorsRef.current = true;
            setMessageDialog.current?.({
                description: "Error ao adicionar",
                title: "Error",
                type: "error"
            });
            setLoading(false);
        }
    };

    return (
        <Main>
            <Panel component="h1" title="Add new stock" />
            <form
                className={classNames(classes.form, "flex flex-col justify-between overflow-y-auto py-6  px-5 xl:px-8 w-full")}>
                <div>
                    <div className="flex flex-wrap justify-between">
                        <Input 
                            className="input w12"
                            label="Insere a referencia da fatura do fornecedor"
                        />
                        { stockProvidersMemo }
                        { addProductMemo }
                    </div>
                    { newStockListMemo }
                </div>
                <div className="flex flex-col items-end justify-between mt-12 xl:flex-row-reverse">
                    <Paper 
                        className={classNames(classes.paper, "bg-stone-200 py-4 px-3")}
                        elevation={0}>
                        <Typography
                            className="flex items-end justify-between mb-3">
                            <span className="font-semibold text-base uppercase">Iva</span>
                            <span className="font-bold text-xl xl:text32xl">{ toLiteral.products.stats.totalVAT } MT</span>
                        </Typography>
                        <Typography
                            className="flex items-end justify-between mb-3">
                            <span className="font-semibold text-base">subTotal</span>
                            <span className="font-bold text-xl xl:text32xl">{ toLiteral.products.stats.subTotal } MT</span>
                        </Typography>
                        <Typography
                            className="flex items-end justify-between">
                            <span className="font-semibold text-base">Total</span>
                            <span className="font-bold text-xl xl:text32xl">{ toLiteral.products.stats.total } MT</span>
                        </Typography>
                    </Paper>
                    <div className="flex items-stretch jsutify-between">
                        { homeMemo }
                        <Button
                            className="bg-neutral-700 ml-4 text-white hover:bg-neutral-800"
                            onClick={clickHandler}
                            startIcon={<SaveIcon />}
                            variant='contained'>
                            { loading ? "Loading..." : "Guardar" }
                        </Button>
                    </div>
                </div>
            </form>
            { messageDialogMemo }
        </Main>
    );
};

export default Container;