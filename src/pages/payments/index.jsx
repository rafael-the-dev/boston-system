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
        <div className="flex items-stretch justify-end mt-8">
            <CancelLink href="/">Back</CancelLink>
            <PrimaryButton classes={{ link: "ml-4" }} href="/add-stock" startIcon={<AddIcon />}>
                Adicionar stock
            </PrimaryButton>
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