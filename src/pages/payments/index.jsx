import * as React from "react";
import Button from "@mui/material/Button";

import AddIcon from '@mui/icons-material/Add';

import classes from "../styles.module.css";

import { fetchHelper, getAuthorizationHeader } from "src/helpers/queries"

import Content from "src/components/scroll-container";
import CancelLink from "src/components/cancel-link";
import Link from "src/components/link";
import Main from "src/components/main";
import Panel from "src/components/panel";
import PrimaryButton from "src/components/primary-button"
import Table from "src/components/stocks-page/table"

const Container = () => {
    const [ stocksList, setStocksList ] = React.useState([]);

    const filterList = () => stocksList;

    const linksMemo = React.useMemo(() => (
        <div className="flex flex-col items-stretch justify-end mt-8 sm:flex-row-reverse sm:justify-start">
            <PrimaryButton classes={{ button: "w-full", link: "mb-4 sm:ml-4 sm:mb-0" }} href="/add-stock" startIcon={<AddIcon />}>
                Adicionar stock
            </PrimaryButton>
            <CancelLink classes={{ button: "w-full" }} href="/">Back</CancelLink>
        </div>
    ), []);

    const panel = React.useMemo(() => (
        <Panel 
            component="h1"
            title="Pagamentos"
        />
    ), []);

    const fetchData = React.useCallback(async () => {
        try {
            const options = {
                ...getAuthorizationHeader()
            };

            const data = await fetchHelper({ options, url: "/api/stock-providers-invoices"});
            setStocksList(data);
        } catch(e) {

        }
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [ fetchData ])

    return (
        <Main>
            { panel }
            <Content>
                <Table invoicesList={filterList()} />
                { linksMemo }
            </Content>
        </Main>
    );
};

export default Container;