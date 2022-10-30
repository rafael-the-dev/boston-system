import * as React from "react";
import { FormControl, FormControlLabel, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid"

import classes from "./styles.module.css"

import { formatDates } from "src/helpers/date";
import { SalesTabContext } from "src/context"

import Chart from "../../../chart"
import Resizeable from "src/components/resizeable";
import Table from "./components/table"

const Container = () => {
    const { getSales } = React.useContext(SalesTabContext);

    const [ value, setValue ] = React.useState("TABLE")

    const controls = React.useRef([
        { label: 'Table', value: "TABLE" },
        { label: 'Chart', value: "CHART" }
    ]);

    const changeHandler = React.useCallback(e => setValue(e.target.value), []);

    const getSalesDate = React.useCallback(() => {
        return getSales().list.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }, [ getSales ]);

    const chartMemo = React.useMemo(() => <Chart />, [])
    const tableMemo = React.useMemo(() => <Table />, [])

    const titleMemo = React.useMemo(() => (
        <Typography
            component="h2"
            className="font-bold text-xl">
            Sales list { formatDates(getSalesDate()) }
        </Typography>
    ), []);

    const resizeHelper = React.useCallback((el) => {
        el.current.style.width = "100%";
    }, [])

    return (
        <Resizeable classes={{ root: "bg-white rounded-t-xl" }} helper={resizeHelper} key={uuidV4()}>
            <Paper 
                className="flex flex-col h-full overflow-y-auto rounded-t-xl w-full"
                elevation={0}>
                <div className="flex flex-col justify-between p-4 sm:flex-row sm:items-center">
                    { titleMemo }
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="filters-title"
                            name="radio-buttons-group"
                            row
                        >
                            {
                                controls.current.map(item => (
                                    <FormControlLabel 
                                        value={item.value} 
                                        control={<Radio checked={value === item.value} onChange={changeHandler} />} 
                                        label={item.label} 
                                    />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classNames(classes.tableContainer, "w-full")}>
                    { value === "TABLE" ? tableMemo : chartMemo }
                </div>
            </Paper>
        </Resizeable>
    );
};

export default Container;