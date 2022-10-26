import { useCallback, useContext, useRef, useState } from "react"
import { Button, Typography } from "@mui/material";
import { v4 as uuidV4 } from "uuid";
import classNames from "classnames";

import classes from "./styles.module.css"

import { getCategories, getProducts } from "src/helpers/queries"
import { LoginContext, SaleContext, SaleContextProvider } from "src/context";

import Input from "src/components/default-input";
import Link from "src/components/link"
import Table from "src/components/table"
import { AddProductButton, TableRow } from "src/components/sale-page";  

export const getServerSideProps = async () => {
    const [ categories, products ] = await Promise.all([ getCategories(), getProducts() ]);
    
    return {
        props: {
            categories, 
            products
        }, // will be passed to the page component as props
    }
};


const Container = ({ categories, products }) => {
    const { loggedUser } = useContext(LoginContext);
    const { cart, getCart } = useContext(SaleContext);

    const [ barCode, setBarCode ] = useState("")
    const [ loading, setLoading ] = useState(false);

    const headers = useRef([
        { key: "barCode", label: "Codigo de barra" },
        { key: "name", label: "Nome" },
        { key: "sellVAT", label: "IVA" },
        { key: "sellPrice", label: "Preco Unit" },
        { key: "quantity", label: "Quantidade" },
        { key: "vatSubTotal", label: "IVA SubTotal" },
        { key: "subTotal", label: "SubTotal" },
    ]);

    const getBodyRows = useCallback(({ page , rowsPerPage }) => {
        const list = rowsPerPage > 0 ? cart.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : cart;
        
        return (
            <>
                {
                    list.map(row => (
                        <TableRow 
                            cartItem={row}
                            headers={headers}
                            key={uuidV4()}
                        />
                    ))
                }
            </>
        );
    }, [ cart, getCart ]);

    const barCodeChangeHandler = useCallback(e => {
        setBarCode(e.target.value);
    }, []);

    const resetHandler = useCallback(() => getCart().reset(), [])

    const submitHandler = useCallback((e) => {
        e.preventDefault();

        setLoading(true);

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
            })
    }, [ loggedUser ])

    return (
        <main className={classNames(classes.main, `bg-stone-100 grow`)}>
            <section className="h-full">
                <form
                    className="flex flex-col h-full items-stretch justify-between"
                    onSubmit={submitHandler}>
                    <div className="px-5">
                        <div className="flex flex-wrap justify-between pt-4">
                            <Input 
                                className="input w12"
                                label="codigo de barra"
                                onChange={barCodeChangeHandler}
                                value={barCode}
                            />
                            <AddProductButton 
                                categories={categories} 
                                products={products}
                            />
                        </div>
                        <div className="mt-8">
                            <Table 
                                data={[]}
                                getBodyRows={getBodyRows}
                                headers={headers}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-end justify-between px-5 py-4">
                            <div>
                                <Link href="/">
                                    <Button
                                        className="border-blue-500 py-3 sm:px-8 text-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                                        variant="outlined">
                                        Sair
                                    </Button>
                                </Link>
                                <Button
                                    className="border-red-600 ml-3 py-3 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white"
                                    onClick={resetHandler}
                                    variant="outlined">
                                    Limpar carrinho
                                </Button>
                            </div>
                            <div className="flex flex-col items-end">
                                <Typography>
                                    Total
                                    <span className="font-bold ml-3 text-3xl">{ getCart() ? getCart().total : 0 }MT</span>
                                </Typography>
                            </div>
                        </div>
                        <div className="bg-gray-200 flex items-center justify-between">
                            <Typography>
                                { loggedUser.Username }
                            </Typography>
                            <Button
                                className={classNames(classes.paymentButton, `bg-gray-700 font-bold rounded-none md:text-lg xl:text-xl text-white`)}
                                type="submit">
                                {loading ? "Loading..." : `Pagar ${  getCart() ? getCart().total : 0}MT` }
                            </Button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Container;