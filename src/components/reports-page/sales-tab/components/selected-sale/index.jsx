import * as React from "react";
import { Button } from "@mui/material"
import classNames from "classnames";
import currency from "currency.js";
import { v4 as uuidV4 } from "uuid";
import moment from "moment"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import classes from "./styles.module.css"

import { SalesTabContext } from "src/context"

import DateHighlight from "../date-highlight";
import Highlights from "../../../highlights";
import Resizeable from "src/components/resizeable"
import Table from "src/components/table";
import TableRow from "../table-row"

const SelectedSaleContaienr = () => {
    const { selectedSale, setSelectedSale } = React.useContext(SalesTabContext);

    const headers = React.useRef([
        { label: "Name", key: "product", value: "name" },
        { label: "Price", key: "product", value: "price" },
        { label: "Amount", value: "amount" },
        { label: "Total VAT", value: "totalVAT" },
        { label: "Total", value: "total" }
    ]);

    const paymentMethodsHeaders = React.useRef([
        { label: "Payment Method", value: "description" },
        { label: "Amount", value: "amount" },
        { label: "Received", value: "received" },
        { label: "Changes", value: "changes" },
    ])
    /**
     * 
        { label: "Received", value: "received" },
        { label: "Change", value: "change" },
        { label: "Paid via", value: "methodId" },
     */

    const getDate = React.useCallback(() => {
        if(selectedSale.length > 0) return moment(selectedSale[0].date).format("DD/MM/YYYY");

        return "";
    }, [ selectedSale ])

    const dateHighlight = React.useMemo(() => <DateHighlight>{ getDate() }</DateHighlight>, [ getDate ]);

    const saleStats = React.useMemo(() => {
        const stats = {};

        stats.total = currency(selectedSale.products.reduce((previousValue, currentSale) => {
            return currency(currentSale.total).add(previousValue)
        }, 0)).value;

        stats.totalAmount = currency(selectedSale.products.reduce((previousValue, currentSale) => {
            return currency(currentSale.amount).add(previousValue)
        }, 0)).value;

        stats.totalVAT = currency(selectedSale.products.reduce((previousValue, currentSale) => {
            return currency(currentSale.totalVAT).add(previousValue)
        }, 0)).value;

        return stats;
    }, [ selectedSale ])

    const highlightsMemo = React.useMemo(() => (
        <Highlights 
            total={saleStats.total}
            totalAmount={saleStats.totalAmount}
            totalVAT={saleStats.totalVAT}
        />
    ), [ saleStats ]);

    const getSelectedSaleBodyRows = React.useCallback(( tableHeaders, tableList) => ({ page, rowsPerPage }) => {
        const result = rowsPerPage > 0 ? tableList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : tableList;
        
        return result.map(row => (
            <TableRow headers={tableHeaders} row={row} key={row.salesDetailsId} />
        ));
    }, [ ]); 

    const resizeHelper = React.useCallback((el) => {
        el.current.style.width = "100%";
    }, [])

    const tableMemo = React.useMemo(() => (
        <div className="mb-6 px-5 w-full">
            <Resizeable classes={{ root: "bg-white" }} helper={resizeHelper} key={uuidV4()}>
                <Table 
                    classes={{ tableHeaderRow: classes.tableHeadRow, tableHeadCell: "text-white", root: "h-full", table: "h-full" }}
                    data={selectedSale.products}
                    getBodyRows={getSelectedSaleBodyRows(headers, selectedSale.products)}
                    headers={headers}
                />
            </Resizeable>
        </div>
    ), [ getSelectedSaleBodyRows, resizeHelper, selectedSale ]);

    const paymentMethodsTableMemo = React.useMemo(() => (
        <div className="mb-6 px-5 w-full">
            <Resizeable classes={{ root: "bg-white" }} helper={resizeHelper} key={uuidV4()}>
                <Table 
                    classes={{ tableFooter: "hidden", tableHeaderRow: "bg-stone-300", tableHeadCell: "text-white", root: "h-full", table: "h-full" }}
                    data={selectedSale.paymentMethods}
                    getBodyRows={getSelectedSaleBodyRows(paymentMethodsHeaders, selectedSale.paymentMethods)}
                    headers={paymentMethodsHeaders}
                />
            </Resizeable>
        </div>
    ), [ getSelectedSaleBodyRows, resizeHelper, selectedSale ]);

    const clickHandler = React.useCallback(() => setSelectedSale([]), [setSelectedSale ])

    return (
        <>
            { dateHighlight }
            <Button
                className="bg-blue-500 text-white mt-4 ml-5 hover:bg-blue-700"
                onClick={clickHandler}
                startIcon={<ArrowBackIcon />}
                variant="outlined">
                Back
            </Button>
            <div className="flex flex-wrap justify-between py-8 px-5">
                { highlightsMemo }
            </div>
            { tableMemo }
            { paymentMethodsTableMemo }
        </>
    );
};

export default SelectedSaleContaienr;