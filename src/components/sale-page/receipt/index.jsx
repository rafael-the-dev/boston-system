import * as React from "react";
import { Typography, TableCell, TableRow } from "@mui/material";
import { v4 as uuidV4 } from "uuid";
import classNames from "classnames";

const ReceiptContainer = ({ products, paymentMethods, stats }) => {
    const headers = React.useRef([
        { label: "Name", value: "description" },
        { label: "Quantity", value: "quantity" },
        { label: "Price", value: "price" },
        { label: "Total", value: "totalAmount" }
    ]);
    const paymentMethodHeaders = React.useRef([
        { label: "Name", value: "description" },
        { label: "Amount", value: "amount" },
        { label: "Received", value: "received" },
        { label: "Change", value: "change" }
    ]);

    const getHeader = (list) => (
        <thead>
            <tr>
                {
                    list.current.map(header => (
                        <th 
                            key={header.value}
                            style={{ textAlign: [ "description" ].includes(header.value) ? "left" : "center" }}>
                            { header.label }
                        </th>
                    ))
                }
            </tr>
        </thead>
    );

    const getTableBody = (headersList, rows) => (
        <tbody>
            {
                rows.map(row => (
                    <tr key={uuidV4()}>
                        {
                            headersList.current.map(header => (
                                <td
                                    className={classNames("py-3", [ "description" ].includes(header.value) ? "text-left" : "text-center")}
                                    key={header.value}
                                    style={{ textAlign: [ "description" ].includes(header.value) ? "left" : "center" }}>
                                    { row[header.value] }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    );

    return (
        <div 
            style={{ display: "flex", flexDirection: "column", padding: "1.1rem 1rem", width: "100%" }}>
            <main style={{ flexGrow: "grow" }}>
                <div>
                    <Typography
                        component="h2"
                        style={{ fontWeight: 600, marginBottom: ".5rem" }}>
                        Items
                    </Typography>
                    <div>
                        <table style={{ width: "100%" }}>
                            { getHeader(headers) }
                            { getTableBody(headers, products) }
                        </table>
                    </div>
                </div>
                <div className="mt-3">
                    <Typography
                        component="h2"
                        style={{ fontWeight: 600, marginBottom: ".5rem" }}>
                        Payment method
                    </Typography>
                    <div>
                        <table style={{ width: "100%"}}>
                            { getHeader(paymentMethodHeaders) }
                            { getTableBody(paymentMethodHeaders, paymentMethods) }
                        </table>
                    </div>
                </div>
                <ul style={{ alignItems: "flex-end", display: "flex", flexDirection: "column", marginTop: "1rem" }}>
                    <Typography
                        component="h3"
                        style={{ fontWeight: "normal", marginBottom: ".5rem" }}>
                        total Vat <span style={{ fontSize: "1.2rem", fontWeight: "bold", marginLeft: ".75rem" }}>{ stats.totalVAT }MT</span>
                    </Typography>
                    <Typography
                        component="h3"
                        style={{ fontWeight: "normal", marginBottom: ".5rem" }}>
                        subTotal <span style={{ fontSize: "1.2rem", fontWeight: "bold", marginLeft: ".75rem" }}>{ stats.totalAmount  }MT</span>
                    </Typography>
                    <Typography
                        component="h3"
                        style={{ fontWeight: "normal" }}>
                        Total <span style={{ fontSize: "1.2rem", fontWeight: "bold", marginLeft: ".75rem" }}>{ stats.subTotal }MT</span>
                    </Typography>
                </ul>
            </main>
        </div>
    );
};

export default ReceiptContainer;