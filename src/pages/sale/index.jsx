import { useCallback, useContext, useState } from "react"
import { Button, Typography } from "@mui/material";
import classNames from "classnames"

import classes from "./styles.module.css"

import { LoginContext } from "src/context";

import Avatar from "src/components/header/components/avatar"
import Panel from "src/components/panel"

const Container = () => {
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
                    <div></div>
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