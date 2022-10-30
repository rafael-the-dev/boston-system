import * as React from "react";
import classNames from "classnames";
import * as cookies from "cookie";

import { SalesContext } from "src/context";
import { fetchHelper } from "src/helpers/queries"

import classes from "./styles.module.css"

import { TabButton } from "src/components/reports-page";

export const getServerSideProps = async ({ req: { headers } }) => {
    const { token } = cookies.parse(headers.cookie);
    const options = {
        headers: {
            "Authorization": token
        }
    };

    let sales = { list: [], stats: {} };

    try {
        sales = await fetchHelper({ url: `${process.env.SERVER}/api/reports`, options });

    } catch(e) {
    }
   
    return {
        props: {
            sales
        }
    }
} 

const Container = ({ sales }) => {
    const { setGlobalSales, tabs } = React.useContext(SalesContext);

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