import * as React from "react";
import Button from "@mui/material/Button";

import classes from "../styles.module.css";


import { fetchHelper, getAuthorizationHeader } from "src/helpers/queries"

import Content from "src/components/scroll-container";
import CancelLink from "src/components/cancel-link";
import Main from "src/components/main";
import Panel from "src/components/panel";
import PrimaryButton from "src/components/primary-button";
import Table from "src/components/default-table"

const Container = () => {
    const [ stocksList, setStocksList ] = React.useState([]);

    const headers = React.useRef([
        { label: "Codigo de barra", value: "barCode" },
        { label: "Nome", value: "name" },
        { label: "Stock atual", key: "stock", value: "currentStock" }
    ]);

    const filterList = () => stocksList;

    const linksMemo = React.useMemo(() => (
        <div className="flex flex-col items-stretch justify-end mt-8 sm:flex-row">
            <CancelLink 
                classes={{ button: "w-full" }}
                href="/" 
            />
            <PrimaryButton classes={{ button: "w-full", link: "my-3 sm:mx-4 sm:my-0" }} href="/stock-providers" variant="outlined">
                Stock suppliers
            </PrimaryButton>
            <PrimaryButton classes={{ button: "w-full" }} href="/add-stock">
                Add stock
            </PrimaryButton>
        </div>
    ), []);

    const panel = React.useMemo(() => (
        <Panel 
            component="h1"
            title="Stocks list"
        />
    ), []);

    const fetchData = React.useCallback(async () => {
        try {
            const options = {
                ...getAuthorizationHeader()
            };

            const data = await fetchHelper({ options, url: "/api/stocks"});
            setStocksList(data);
        } catch(e) {
            console.error(e)
        }
    }, [])

    React.useEffect(() => {
        fetchData();
    }, [ fetchData ]);

    return (
        <Main>
            { panel }
            <Content>
                <Table 
                    classes={{ root: "overflow-x-auto" }}
                    data={filterList()}
                    headers={headers}
                />
                { linksMemo }
            </Content>
        </Main>
    );
};

export default Container;