import * as React from "react";
import { Typography, TableCell, TableRow } from "@mui/material";
import { v4 as uuidV4 } from "uuid";
import classNames from "classnames";

import Table from "src/components/table";

const ReceiptContainer = () => {
    const headers = React.useRef([
        { label: "Name", value: "name" },
        { label: "Quantity", value: "quantity" },
        { label: "Price", value: "price" },
        { label: "Total", value: "total" }
    ]);
    const paymentMethodHeaders = React.useRef([
        { label: "Name", value: "description" },
        { label: "Amount", value: "amount" },
        { label: "Received", value: "received" },
        { label: "Change", value: "change" }
    ]);

    const getTableBodyRows = (tableHeaders, rows) => ({}) => (
        [].map(item => (
            <TableRow key={uuidV4()}>
                {
                    tableHeaders.current.map(header => (
                        <TableCell
                            align="left"
                            key={uuidV4()}>
                            { item[header] }
                        </TableCell>
                    ))
                }
            </TableRow>
        ))
    );

    return (
        <div className="px-4 py-6">
            <div>
                <Typography
                    component="h2"
                    className={classNames("font-semibold")}>
                    Items
                </Typography>
                <Table 
                    data={[]}
                    getBodyRows={getTableBodyRows(headers)}
                    headers={headers}
                    classes={{ table: "border-0", tableFooter: "hidden" }}
                />
            </div>
            <div>
                <Typography
                    component="h2"
                    className={classNames("font-semibold")}>
                    Payment method
                </Typography>
                <Table 
                    data={[]}
                    getBodyRows={getTableBodyRows(paymentMethodHeaders)}
                    headers={paymentMethodHeaders}
                    classes={{ table: "border-0", tableFooter: "hidden" }}
                />
            </div>
            <div>
                <Typography
                    component="h3"
                    className={classNames("font-semibold text-right")}>
                    total <span className="font-bold text-lg md:text-xl">500MT</span>
                </Typography>
            </div>
        </div>
    );
};

export default ReceiptContainer;