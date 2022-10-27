import * as React from "react";
import { v4 as uuidV4 } from "uuid";

import { SaleContext } from "src/context"

import EmptyCart from "../empty-cart";
import Table from "src/components/table";
import TableRow from "../table-row"; 

const CartTable = React.memo(() => {
    const { cart } = React.useContext(SaleContext);

    const headers = React.useRef([
        { key: "barCode", label: "Codigo de barra" },
        { key: "name", label: "Nome" },
        { key: "sellVAT", label: "IVA" },
        { key: "sellPrice", label: "Preco Unit" },
        { key: "quantity", label: "Quantidade" },
        { key: "vatSubTotal", label: "IVA SubTotal" },
        { key: "subTotal", label: "SubTotal" },
        { key: "delete", label: "Remover Item" },
    ]);

    const getBodyRows = ({ page , rowsPerPage }) => {
        const list = rowsPerPage > 0 ? cart.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : cart;
        
        return (
            <>
                {
                    list.map(row => (
                        <TableRow 
                            cartItem={row}
                            headers={headers}
                            key={uuidV4()}
                        />
                    ))
                }
            </>
        );
    };

    if(cart.length === 0) return <EmptyCart />

    return (
        <div className="mt-8">
            <Table 
                data={[]}
                getBodyRows={getBodyRows}
                headers={headers}
            />
        </div>
    );
});

export default CartTable;