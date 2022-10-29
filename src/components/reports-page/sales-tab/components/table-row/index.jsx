import * as React from "react";
import classNames from "classnames"

import { TableCell, TableRow } from "@mui/material";
import moment from "moment";

import { SalesTabContext } from "src/context"

const TableRowContainer = ({ headers, row }) => {
    const { selectedSale, setSelectedSale } = React.useContext(SalesTabContext);

    const getId = () => {
        return Boolean(selectedSale.find(item => item.id === row.id))
    };

    const getCellLabel = (header) => {
        if(header.value === "data") {
            return moment(row[header.value]).format("DD-MM-YYYY HH:mm:ss")
        }

        return row[header.value];
    };

    const clickHandler = () => {
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
            className={classNames("cursor-pointer", { "bg-stone-200": getId() })}
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