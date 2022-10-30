import * as React from "react";
import { v4 as uuidV4 } from "uuid";

import { SalesTabContext } from "src/context";

import Table from "src/components/table";
import TableRow from "../../../table-row";

const TableContainer = () => {
    const { getSales } = React.useContext(SalesTabContext);

    const headers = React.useRef([
        { label: "id", value: "id" },
        { label: "Date", value: "date" },
        { label: "Sold by", value: "user" },
        { label: "Amount", value: "amount" },
        { label: "Total VAT", value: "totalVAT" },
        { label: "Total", value: "total" }
    ]);

    const getBodyRows = React.useCallback(({ page, rowsPerPage }) => {
        const list = getSales().list;
        
        const result = rowsPerPage > 0 ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : list;
        
        return result.map(row => (
            <TableRow headers={headers} isClickable row={row} key={uuidV4()} />
        ));
    }, [ getSales ]);

    const salesTableMemo = React.useMemo(() => (
        <Table 
            classes={{ tableHeaderRow: "bg-stone-200", root: "h-full", table: "h-full" }}
            data={getSales().list}
            getBodyRows={getBodyRows}
            headers={headers}
        />
    ), [ getSales, getBodyRows ]);

    return salesTableMemo;
};

export default TableContainer;