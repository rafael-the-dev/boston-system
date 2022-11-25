import * as React from "react";

import Table from "src/components/table";
import TableRow from "./components/table-row";

const TableContainer = ({ invoicesList }) => {
    const headers = React.useRef([
        { label: "Referencia da fatura", value: "invoiceCode" },
        { label: "Nome do fornecedor", key: "provider", value: "name" },
        { label: "Endereco", key: "provider", value: "address" },
        { label: "IVA", value: "totalVAT" },
        { label: "Subtotal", value: "subTotal" },
        { label: "Total", value: "total" },
        { label: "Data", value: "date" }
    ]);
    
    const getBodyRows = ({ page, rowsPerPage }) => {
        const list = rowsPerPage > 0 ? invoicesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : invoicesList;

        return list.map(item => (
            <TableRow 
                headers={headers}
                invoice={item}
                key={item.providerInvoiceId}
            />
        ))
    };

    return (
        <div>
            <Table 
                data={invoicesList}
                headers={headers}
                getBodyRows={getBodyRows}
            />
        </div>
    );
};

export default TableContainer;