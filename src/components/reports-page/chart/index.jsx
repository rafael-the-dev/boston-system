import * as React from "react";
import dynamic from "next/dynamic"
import currency from "currency.js";
import lodash from "lodash";
import moment from "moment";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import classes from "./styles.module.css"

import { SalesTabContext } from "src/context"

import Button from "./components/button";

const LineChart = dynamic(() => import( "./components/line-chart"), { ssr: false })

const ChartContainer = () => {
    const [ chart, setChart ] = React.useState("LINE");
    const [ open, setOpen ] = React.useState("");
    const [ xAxe, setXAxe ] = React.useState([ "DAY" ]);
    const [ yAxe, setYAxe ] = React.useState([]);

    const { getSales } = React.useContext(SalesTabContext);

    const chartsType = React.useRef([
        { label: "Bar", value: "BAR" },
        { label: "Line", value: "LINE" },
        { label: "Pie", value: "PIE" }
    ]);

    const xAxeList = React.useRef([
        { label: "Day", value: "DAY" },
        { label: "Week", value: "WEEK" },
        { label: "Month", value: "MONTH" },
        { label: "Year", value: "YEAR" }
    ]);

    const yAxeList = React.useRef([
        { label: "Total", value: "TOTAL" },
        { label: "amount", value: "AMOUNT" },
        { label: "VAT", value: "VAT" },
    ]);

    const clickHandler = React.useCallback(newValue => () => {
        setOpen(currentValue => {
            if(currentValue === newValue) return "";

            return newValue;
        })
    }, []);

    const chartChangeHandler = React.useCallback(e => setChart(e.target.value), [])

    const axeChangeHandler = React.useCallback(func => e => {
        const { value } = e.target;

        func(currentList => {
            if(currentList.includes(value)) return [ ...currentList.filter(item => item !== value)];

            return [ ...currentList, value ];
        })
    }, []);

    const isAxeSelected = React.useCallback(list => (itemValue) => list.includes(itemValue), []);
    const isChartSelected = React.useCallback((itemValue) => chart === itemValue, [ chart ])

    const getElements = React.useCallback((labelList, isSelected, onChange) => {
        return (
            <FormGroup row>
                {
                    labelList.current.map(item => (
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    checked={isSelected(item.value)} 
                                    onChange={onChange}
                                    value={item.value}
                                />} 
                            label={item.label} 
                            key={item.value}
                        />
                    ))
                }
            </FormGroup>
        );
    }, []);

    const groupByDay = React.useMemo(() => {
        const groupedList = Object.entries(lodash.groupBy(getSales().list, item => moment(item.date).format("DD")));
        
        return lodash.map(groupedList
            , item => {
                const [ key, list ] = item;

                const result = lodash.reduce(list, (previousValue, currentItem) => {
                    return {
                        subTotal: currency(previousValue.subTotal).add(currentItem.amount).value, 
                        total: currency(previousValue.total).add(currentItem.total).value, 
                        totalVAT: currency(previousValue.totalVAT).add(currentItem.totalVAT).value
                    };
                }, { subTotal: 0, total: 0, totalVAT: 0 });

                return { [key]: result };
            }
        );
    }, [ getSales ]);

    const data = React.useMemo(() => {
        if(xAxe.includes("DAY")) return groupByDay;
    }, [ data, groupByDay, xAxe ])
    
    return (
        <div className="h-full w-full">
            <div className="px-4">
                <div className="flex">
                    <Button id="CHART_TYPE" onClick={clickHandler} selectedKey={open}>Type of chart</Button>
                    <Button id="X_AXE" onClick={clickHandler} selectedKey={open}>X axe</Button>
                    <Button id="Y_AXE" onClick={clickHandler} selectedKey={open}>Y axe</Button>
                </div>
                <div className="pl-2">
                    {
                        {   
                            "CHART_TYPE": getElements(chartsType, isChartSelected, chartChangeHandler),
                            "X_AXE": getElements(xAxeList, isAxeSelected(xAxe), axeChangeHandler(setXAxe)),
                            "Y_AXE": getElements(yAxeList, isAxeSelected(yAxe), axeChangeHandler(setYAxe))
                        }[open]
                    }
                </div>
            </div>
            <div className={classes.chartContainer}>
                {
                    {
                        "LINE": <LineChart data={data} />
                    }[chart]
                }
            </div>
        </div>
    );
};

export default ChartContainer;