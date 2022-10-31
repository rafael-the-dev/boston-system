import * as React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import Button from "./components/button"

const ChartContainer = () => {
    const [ chart, setChart ] = React.useState("LINE");
    const [ open, setOpen ] = React.useState("");
    const [ xAxe, setXAxe ] = React.useState([]);
    const [ yAxe, setYAxe ] = React.useState([]);

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
                        />
                    ))
                }
            </FormGroup>
        );
    }, []);

    

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
        </div>
    );
};

export default ChartContainer;