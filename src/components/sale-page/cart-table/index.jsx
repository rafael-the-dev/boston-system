import * as React from "react";
import classNames from "classnames";

import classes from "./styles.module.css";

import { SaleContext } from "src/context"

import EmptyCart from "../empty-cart";
import Table from "src/components/table";
import TableRow from "../table-row"; 

const CartTable = () => {
    const { cart } = React.useContext(SaleContext);

    const headers = React.useRef([
        { key: "barCode", label: "Bar code" },
        { key: "name", label: "Name" },
        { key: "sellVAT", label: "VAT" },
        { key: "sellPrice", label: "Unit price" },
        { key: "quantity", label: "Quantity" },
        { key: "currentStock", label: "Current Stock" },
        { key: "vatSubTotal", label: "VAT SubTotal" },
        { key: "subTotal", label: "SubTotal" },
        { key: "delete", label: "Remove Item" },
    ]);

    const getBodyRows = React.useCallback(({ page , rowsPerPage }) => {
        const list = rowsPerPage > 0 ? cart.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : cart;
        
        return (
            <>
                {
                    list.map(row => (
                        <TableRow 
                            cartItem={row}
                            headers={headers}
                            key={row.product.id}
                        />
                    ))
                }
            </>
        );
    }, [ cart ]);

    const tableMemo = React.useMemo(() => (
        <Table 
            data={[]}
            getBodyRows={getBodyRows}
            headers={headers}
        />
    ), [ getBodyRows ])

    if(cart.length === 0) return <EmptyCart />

    return (
        <div className={classNames(classes.container, "mt-8 overflow-y-auto")}>
            { tableMemo }
        </div>
    );
};

export default CartTable;