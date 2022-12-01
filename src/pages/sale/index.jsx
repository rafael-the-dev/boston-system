import { useCallback, useContext, useEffect, useRef, useMemo, useState } from "react"
import { Button, Typography } from "@mui/material";
import * as cookie from "cookie"
import classNames from "classnames";

import classes from "./styles.module.css";

import { SaleTabsContext } from "src/context";

import Tabs from "src/components/sale-page/tabs";

// server side render products and categories
export { getProductsAndCategories as getStaticProps } from "src/helpers/server-side";

const Container = ({ categories }) => {
    const { getTabs, setCategories } = useContext(SaleTabsContext);

    const tabsMemo = useMemo(() => <Tabs />, []);

    useEffect(() => {
        setCategories(categories);
    }, [ categories, setCategories ])

    return (
        <main className={classNames(classes.main, `bg-stone-100 flex flex-col items-stretch grow`)}>
            { tabsMemo }
            <div className="grow">
                {
                    getTabs().list.map(item => item.element)
                }
            </div>
        </main>
    );
};

export default Container;