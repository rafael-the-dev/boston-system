import * as React from "react";
import { Button, Typography } from "@mui/material"
import classNames from "classnames";
import * as cookies from "cookie";

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { SalesContext } from "src/context"

import classes from "./styles.module.css"

import { Highlight } from "src/components/reports-page";

export const getServerSideProps = async ({ req }) => {
    const parsedCookies = cookies.parse(req.headers.cookie);
    const options = {
        headers: {
            "Authorization": parsedCookies.token
        }
    };

    let sales = { list: [], stats: {} };

    try {
        const res = await fetch("http://localhost:3000/api/reports", options);
        sales = await res.json();
    } catch(e) {

    }

    return {
        props: {
            sales
        }
    }
} 

const Container = ({ sales }) => {
    const { getSales } = React.useContext(SalesContext);

    React.useEffect(() => {
        getSales().update(sales);
    }, [ sales ]);

    return (
        <main className={classNames(classes.main, `bg-stone-100 grow`)}>
            <div className="flex flex-wrap justify-between py-8 px-5">
                <div className={classNames(classes.hightlightsContainer, "flex flex-wrap items-stretch justify-between")}>
                    <Highlight color="#fecaca" description={getSales().stats?.total} title="Total" />
                    <Highlight color="#fde68a" description={getSales().stats?.subTotal} title="Subtotal" />
                    <Highlight color="#e9d5ff" description={getSales().stats?.totalVAT} title="Total VAT" />
                </div>
                <Button
                    className={classNames(classes.filtersButton, "bg-white rounded-xl text-black hover:bg-stone-400")}
                    startIcon={<FilterAltIcon />}>
                    Filtros
                </Button>
            </div>
        </main>
    );
};

export default Container;