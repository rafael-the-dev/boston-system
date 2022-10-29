import * as React from "react";
import { Button, Typography } from "@mui/material"
import classNames from "classnames";
import * as cookies from "cookie";


import { SalesContext, SalesTabContextProvider } from "src/context"

import classes from "./styles.module.css"

import { SalesTab, TabButton } from "src/components/reports-page";

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
        if(res.status === 200) {
            sales = await res.json();
        }

        throw new Error();
    } catch(e) {
    }

    return {
        props: {
            sales
        }
    }
} 

const Container = ({ sales }) => {
    const { currentTab, setGlobalSales, tabs } = React.useContext(SalesContext);

    React.useEffect(() => {
        setGlobalSales(sales);
    }, [ sales ]);

    return (
        <main className={classNames(classes.main, `bg-stone-100 grow`)}>
            <div className="flex px-5">
                {
                    tabs.map((item, index) => <TabButton { ...item } index={index + 1} key={item.id} />)
                }
            </div>
            {
                tabs.map(item => item.element)
            }
        </main>
    );
};

export default Container;