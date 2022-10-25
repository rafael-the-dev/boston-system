import { useCallback, useContext, useState } from "react"
import { Button, Typography } from "@mui/material";
import classNames from "classnames"

import classes from "./styles.module.css"

import { getCategories, getProducts } from "src/helpers/queries"
import { LoginContext } from "src/context";

import { AddProductButton } from "src/components/sale-page"; 

export const getServerSideProps = async () => {
    const [ categories, products ] = await Promise.all([ getCategories(), getProducts() ]);
    
    return {
      props: {
        categories, 
        products
      }, // will be passed to the page component as props
    }
}

const Container = ({ categories, products }) => {
    const { loggedUser } = useContext(LoginContext);

    const [ loading, setLoading ] = useState(false);

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
                        <div className="flex justify-end pt-4">
                            <AddProductButton 
                                categories={categories} 
                            />
                        </div>
                    </div>
                    <div className="bg-gray-200 flex items-center justify-between">
                        <Typography>
                            { loggedUser.Username }
                        </Typography>
                        <Button
                            className={classNames(classes.paymentButton, `bg-gray-700 font-bold rounded-none md:text-lg xl:text-xl text-white`)}
                            type="submit">
                            {loading ? "Loading..." : "Pagar 275.50MT" }
                        </Button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Container;