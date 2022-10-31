import * as React from "react";
import { Button } from "@mui/material"
import classNames from "classnames";

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import classes from "./styles.module.css"

import { SalesTabContext } from "src/context"

import DataContainer from "../data-show"
import Filters from "../filters"
import Highlights from "../../../highlights";

const TabContainer = ({ tabId }) => {
    const { getSales } = React.useContext(SalesTabContext);

    const onToggle = React.useRef(null);

    const toggleHandler = React.useCallback(() => onToggle.current?.(), [])

    const filtersButtonMemo = React.useMemo(() => (
        <Button
            className={classNames(classes.filtersButton, "bg-white rounded-xl text-black hover:bg-stone-400")}
            onClick={toggleHandler}
            startIcon={<FilterAltIcon />}>
            Filters
        </Button>
    ), []);
    
    const dataContainer = React.useMemo(() => <DataContainer />, []);
    const filtersMemo = React.useMemo(() => <Filters onToggle={onToggle} />, []);

    const highlightsMemo = React.useMemo(() => (
        <Highlights 
            isHome
            totalProfit={getSales().stats?.profit}
            total={getSales().stats?.total}
            totalAmount={getSales().stats?.totalAmount}
            totalVAT={getSales().stats?.totalVAT}
        />
    ), [ getSales ]);
    
    return (
        <>
            <div className="flex flex-wrap justify-between py-8 px-5">
                { highlightsMemo }
                { filtersButtonMemo }
            </div>
            { filtersMemo }
            <div className="px-5">
                { dataContainer }
            </div>
        </>
    );
};

export default TabContainer;