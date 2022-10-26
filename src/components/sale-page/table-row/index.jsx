import { TableCell, TableRow } from "@mui/material"
import { v4 as uuidV4 } from "uuid";

import Input from "./components/input"

const TableRowContainer = ({ cartItem, headers }) => {
    const getData = (header) => {
        switch(header) {
            case "quantity": { return <Input cartItem={cartItem} quantity={cartItem[header]} /> ; }
            case "subTotal": { return cartItem.getTotal(); }
            case "vatSubTotal": { return cartItem.getTotalVAT();}
            default: {
                return cartItem.product[header];
            }
        }
    };
    return (
        <TableRow>
            {
                headers.current.map((header) => (
                    <TableCell 
                        align="center"
                        key={uuidV4()}>
                        { getData(header.key) }
                    </TableCell>
                ))
            }
        </TableRow>
    );
};

export default TableRowContainer;