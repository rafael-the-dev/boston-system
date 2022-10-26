import * as React from "react";
import { v4 as uuidV4 } from "uuid";
import classNames from "classnames";
import { Checkbox, TableCell, TableRow } from "@mui/material"

import { SaleContext } from "src/context"

import CartItem from "src/models/client/CartItem";
import Product from "src/models/Product";

const TableRowContainer = ({ headers, row, selectedProducts, setSelectedProducts }) => {
    const { getCart } = React.useContext(SaleContext);

    const isSelected = () => Boolean(selectedProducts.find(item => item.product.id === row.idProduto));

    const added = () => {
        return Boolean(getCart().list.find(item => item.product.id === row.idProduto));
    };

    const changeHandler = () => {
        setSelectedProducts(list => {
            if(Boolean(list.find(item => item.product.id === row.idProduto))) {
                return [ ...list.filter(item => item.product.id !== row.idProduto) ]
            }

            return [ ...list, new CartItem(new Product(row), 1) ];
        })
    };


    return (
        <TableRow className={classNames(
            { "bg-yellow-100 opacity-60": added() }
        )}>
            {
                headers.current.map((header, index) => (
                    index === 0 ? (
                        <TableCell 
                            align="center"
                            key={uuidV4()}>
                            <Checkbox 
                                checked={isSelected()} 
                                disabled={added()}
                                onChange={changeHandler}
                            />
                        </TableCell>
                    ) :
                    <TableCell 
                        align="center"
                        key={uuidV4()}>
                        { row[header.key] }
                    </TableCell>
                ))
            }
        </TableRow>
    );
};

export default TableRowContainer;