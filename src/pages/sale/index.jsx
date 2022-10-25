import { useCallback, useContext, useState } from "react"
import { Button } from "@mui/material";

import { LoginContext } from "src/context";

import Panel from "src/components/panel"

const Container = () => {
    const { loggedUser } = useContext(LoginContext);

    const [ loading, setLoading ] = useState(false);

    const submitHandler = useCallback((e) => {
        e.preventDefault();

        setLoading(false);

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
    }, [])
    return (
        <main>
            <section>
                <Panel title="Nova venda" />
                <form
                    onSubmit={submitHandler}>
                    <Button>Confirmar</Button>
                </form>
            </section>
        </main>
    );
};

export default Container;