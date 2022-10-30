import * as React from "react";
import classNames from "classnames"

import { TableCell, TableRow } from "@mui/material";
import moment from "moment";

import { SalesTabContext } from "src/context"

const TableRowContainer = ({ headers, isClickable, row }) => {
    const { setSelectedSale } = React.useContext(SalesTabContext);

    const getCellLabel = ({ key, value }) => {
        if(Boolean(key)) {
            if(value === "methodId") {
                return [
                    { value: 100, label: "Cash" },
                    { value: 200, label: "M-pesa" },
                    { value: 300, label: "E-mola" },
                    { value: 400, label: "M-kesh" },
                    { value: 500, label: "POS" },
                    { value: 600, label: "P24" }
                ].find(item => item.value === row[key][value]).label;
            }
            
            return row[key][value];
        }

        if(value === "date") {
            return moment(row[value]).format("DD-MM-YYYY HH:mm:ss");
        } 
        else if(value === "user") {
            return `${row[value]["firstName"]} ${row[value]["lastName"]}`;
        } 

        return row[value];
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