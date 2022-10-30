import * as React from "react";
import { Button, Paper, Typography } from "@mui/material"
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid";
import moment from "moment"

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import classes from "./styles.module.css"

import { SalesContext, SalesTabContext } from "src/context"

import DateHighlight from "../date-highlight";
import Filters from "../filters"
import Highlights from "../../../highlights";
import Resizeable from "src/components/resizeable"
import Table from "src/components/table";
import TableRow from "../table-row"

const TabContainer = ({ tabId }) => {
    const { currentTab } = React.useContext(SalesContext)
    const { getSales, selectedSale } = React.useContext(SalesTabContext);
    
    const headers = React.useRef([
        { label: "id", value: "id" },
        { label: "Date", value: "date" },
        { label: "Amount", value: "amount" },
        { label: "Total VAT", value: "totalVAT" },
        { label: "Total", value: "total" }
    ]);

    const onToggle = React.useRef(null);

    const getSalesDate = React.useCallback(() => {
        return getSales().list.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }, [ getSales ]);

    const formatSalesDate = React.useCallback(() => {
        const list = getSalesDate();

        const formatDate = dateParam => moment(dateParam).format("DD/MM/YYYY");

        if(list.length > 1) {
            const firstDate = formatDate(list[0].date);
            const lastDate = formatDate(list[list.length - 1].date);

            if(firstDate === lastDate) {
                if(firstDate === formatDate(Date.now())) return `Today  -  ${firstDate}`;

                return firstDate;
            }

            return `${firstDate} - ${lastDate}`;
        } else {
            const date = formatDate(new Date(list[0]?.date));

            if(date === formatDate(Date.now())) return `Today  -  ${date}`;

            return date;
        }
    }, [ getSalesDate ])

    const getBodyRows = React.useCallback(({ page, rowsPerPage }) => {
        const list = getSales().list;
        
        const result = rowsPerPage > 0 ? list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : list;
        
        return result.map(row => (
            <TableRow headers={headers} isClickable row={row} key={uuidV4()} />
        ));
    }, [ getSales ]);

    

    const toggleHandler = React.useCallback(() => onToggle.current?.(), [])

    const filtersButtonMemo = React.useMemo(() => (
        <Button
            className={classNames(classes.filtersButton, "bg-white rounded-xl text-black hover:bg-stone-400")}
            onClick={toggleHandler}
            startIcon={<FilterAltIcon />}>
            Filters
        </Button>
    ), []);

    const filtersMemo = React.useMemo(() => <Filters onToggle={onToggle} />, []);

    const highlightsMemo = React.useMemo(() => (
        <Highlights 
            total={getSales().stats?.total}
            totalAmount={getSales().stats?.totalAmount}
            totalVAT={getSales().stats?.totalVAT}
        />
    ), [ getSales ]);

    const resizeHelper = React.useCallback((el) => {
        el.current.style.width = "100%";
    }, [])

    const salesTableMemo = React.useMemo(() => (
            <Table 
                classes={{ tableHeaderRow: "bg-stone-200", root: "h-full", table: "h-full" }}
                data={getSales().list}
                getBodyRows={getBodyRows}
                headers={headers}
            />
    ), [ getSales, getBodyRows, resizeHelper ]);
    
    
    return (
        <>
            <div className="flex flex-wrap justify-between py-8 px-5">
                { highlightsMemo }
                { filtersButtonMemo }
            </div>
            { filtersMemo }
            <div className="px-5">
                <Resizeable classes={{ root: "bg-white rounded-t-xl" }} helper={resizeHelper} key={uuidV4()}>
                    <Paper className="flex flex-col h-full overflow-y-auto rounded-t-xl w-full">
                        <div>
                            <Typography
                                component="h2"
                                className="font-bold py-4 text-center text-xl">
                                Sales list { formatSalesDate() }
                            </Typography>
                        </div>
                        <div className={classNames(classes.tableContainer, "w-full")}>
                            { salesTableMemo }
                        </div>
                    </Paper>
                </Resizeable>
            </div>
        </>
    );
};

export default TabContainer;