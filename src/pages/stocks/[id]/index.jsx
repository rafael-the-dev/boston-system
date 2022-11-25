import * as React from "react";
import {Button} from "@mui/material";
import { useRouter } from "next/router"

import { fetchHelper, getAuthorizationHeader } from "src/helpers/queries";

import Content from "src/components/scroll-container";
import CancelLink from "src/components/cancel-link"
import DefaultTable from "src/components/default-table";
import Link from "src/components/link";
import Main from "src/components/main";
import Panel from "src/components/panel";
import ProductsTable from "src/components/stocks-page/products-table"

const Container = () => {
    const [ invoice, setInvoice ] = React.useState({ provider: {}, products: [], subTotal });

    const providerHeaders = React.useRef([
        { label: "Nome", value: "name" },
        { label: "Endereco", value: "address" },
    ]);

    const statsHeaders = React.useRef([
        { label: "Subtotal", value: "subTotal" },
        { label: "IVA", value: "totalVAT" },
        { label: "Total", value: "total" }
    ]);

    const { products, provider, subTotal, total, totalVAT } = invoice;

    const { query: { id }} = useRouter();

    const backLinkMemo = React.useMemo(() => (
        <CancelLink href="/stocks">
            Back
        </CancelLink>
    ), []);
    const panelMemo = React.useMemo(() => <Panel />, []);

    const fetchData = React.useCallback(async () => {
        try {
            const data = await fetchHelper({ options: getAuthorizationHeader(), url: `/api/stock-providers-invoices/${id}` });
            setInvoice(data)
        }
        catch(e) {}
    }, [ id ])

    React.useEffect(() => {
        fetchData();
    }, [ fetchData ])

    return (
        <Main>
            { panelMemo }
            <Content>
                <div>
                    <ProductsTable products={products} />
                    <div className="flex flex-wrap justify-between mt-8">
                        <div className="input w12">
                            <DefaultTable 
                                classes={{ tableFooter: "hidden" }}
                                data={[ provider ]}
                                headers={providerHeaders}
                            />
                        </div>
                        <div className="input w12">
                            <DefaultTable 
                                classes={{ tableFooter: "hidden" }}
                                data={[ { subTotal, total, totalVAT } ]}
                                headers={statsHeaders}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    { backLinkMemo }
                </div>
            </Content>
        </Main>
    );
};

export default Container;