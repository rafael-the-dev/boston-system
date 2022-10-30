import * as React from "react";
import classNames from "classnames"

import { TableCell, TableRow } from "@mui/material";
import moment from "moment";

import { SalesTabContext } from "src/context"

const TableRowContainer = ({ headers, isClickable, row }) => {
    const { setSelectedSale } = React.useContext(SalesTabContext);

    const getCellLabel = (header) => {
        if(header.value === "date") {
            return moment(row[header.value]).format("DD-MM-YYYY HH:mm:ss");
        }

        return row[header.value];
    };

    const clickHandler = () => {
        if(!Boolean(isClickable)) return;
        
        const { token } = JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user;

        const options = {
            headers: {
                "Authorization": token
            },
            method: "GET"
        };

        fetch(`/api/sales/${row.salesSerieId}`, options)
            .then(res => {
                if(res.status === 200) return res.json();

                throw new Error();
            })
            .then(data => setSelectedSale(data))
            .catch(err => {

            })
    };

    return (
        <TableRow
            className={classNames("cursor-pointer")}
            onClick={clickHandler}>
            {
                headers.current.map(header => (
                    <TableCell
                        align="center"
                        key={header.value}>
                        { getCellLabel(header) }
                    </TableCell>
                ))
            }
        </TableRow>
    )
};

export default TableRowContainer;