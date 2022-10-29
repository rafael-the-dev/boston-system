import * as React from "react";
import { Button, Typography } from "@mui/material"
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid";
import moment from "moment"

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import classes from "./styles.module.css"

import { SalesContext, SalesTabContext } from "src/context"

import Highlight from "../highlight";
import Resizeable from "src/components/resizeable"
import Table from "src/components/table";
import TableRow from "./components/table-row"

const TabContainer = ({ tabId }) => {
    const { currentTab } = React.useContext(SalesContext)
    const { getSales, selectedSale } = React.useContext(SalesTabContext);
    
    const headers = React.useRef([
        { label: "id", value: "id" },
        { label: "Date", value: "data" },
        { label: "Amount", value: "amount" },
        { label: "Total VAT", value: "totalVAT" },
        { label: "Total", value: "total" }
    ]);

    const getSalesDate = React.useCallback(() => {
        return getSales().list.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }, [ getSales ]);

    const formatSalesDate = React.useCallback(() => {
        const list = getSalesDate();

        if(list.length > 1) {

        } else {
            const date = new Date(list[0]?.date);
            const formatedDate = moment(date).format("DD/MM/YYYY");

            if(date = Date.now()) return `Today  -  ${formatedDate}`;

            return formatedDate;
        }
    }, [])

    console.log(getSalesDate())

    const getBodyRows = React.useCallback(({ page, rowsPerPage }) => {
        const list = getSales().list;
        
        const result = rowsPerPage > 0 ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : list;
        
        return result.map(row => (
            <TableRow headers={headers} row={row} key={row.id} />
        ));
    }, [ getSales ]);

    const getSelectedSaleBodyRows = ({ page, rowsPerPage }) => {
        const list = selectedSale;
        
        const result = rowsPerPage > 0 ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : list;
        
        return result.map(row => (
            <TableRow headers={headers} row={row} key={row.id} />
        ));
    }; 

    const filtersButtonMemo = React.useMemo(() => (
        <Button
            className={classNames(classes.filtersButton, "bg-white rounded-xl text-black hover:bg-stone-400")}
            startIcon={<FilterAltIcon />}>
            Filters
        </Button>
    ), [])

    const highlightsMemo = React.useMemo(() => (
        <div className={classNames(classes.hightlightsContainer, "flex flex-wrap items-stretch justify-between")}>
            <Highlight color="rgb(146 199 227 / 71%)" description={getSales().stats?.total} title="Total" />
            <Highlight color="#e2e8f0" description={getSales().stats?.totalAmount} title="Subtotal" />
            <Highlight color="#e5e5e5" description={getSales().stats?.totalVAT} title="Total VAT" />
        </div>
    ), [ getSales ]);

    const salesTableMemo = React.useMemo(() => (
        <Resizeable classes={{ root: "bg-white" }} key={uuidV4()}>
            <Table 
                classes={{ tableHeaderRow: "bg-stone-200", root: "h-full", table: "h-full" }}
                data={getSales().list}
                getBodyRows={getBodyRows}
                headers={headers}
            />
        </Resizeable>
    ), [ getSales, getBodyRows ])
    
    return (
        <div className={classNames("pb-12", { "hidden": currentTab !== tabId })}>
            <Typography 
                className={classNames(classes.date, "absolute font-bold md:text-xl right-5")}>
                { formatSalesDate() }
            </Typography>
            <div className="flex flex-wrap justify-between py-8 px-5">
                { highlightsMemo }
                { filtersButtonMemo }
            </div>
            <div className="flex flex-wrap px-5">
                <div className="mb-6 mr-6">
                    { salesTableMemo }
                </div>
                {
                    Boolean(selectedSale.length) && (
                        <div className="mb-6 mr-6">
                            <Resizeable key={uuidV4()}>
                                <Table 
                                    classes={{ root: "h-full", table: "h-full" }}
                                    data={selectedSale}
                                    getBodyRows={getSelectedSaleBodyRows}
                                    headers={headers}
                                />
                            </Resizeable>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default TabContainer;