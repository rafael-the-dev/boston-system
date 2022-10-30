import * as React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import Button from "./components/button"

const ChartContainer = () => {
    const [ chart, setChart ] = React.useState("LINE");
    const [ open, setOpen ] = React.useState("");
    const [ xAxe, setXAxe ] = React.useState([]);
    const [ yAxe, setYAxe ] = React.useState([]);

    const xAxeList = React.useRef([
        { label: "Day", value: "DAY" },
        { label: "Week", value: "WEEK" },
        { label: "Month", value: "MONTH" },
        { label: "Year", value: "YEAR" }
    ]);

    const clickHandler = React.useCallback(newValue => () => {
        setOpen(currentValue => {
            if(currentValue === newValue) return "";

            return newValue;
        })
    }, []);

    const xAxeChangeHandler = React.useCallback(e => {
        const { value } = e.target;

        setXAxe(currentList => {
            if(currentList.includes(value)) return [ ...currentList.filter(item => item !== value)];

            return [ ...currentList, value ];
        })
    }, [])

    const xAxeElementsListMemo = React.useMemo(() => {
        return (
            <FormGroup row>
                {
                    xAxeList.current.map(item => (
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    checked={xAxe.includes(item.value)} 
                                    onChange={xAxeChangeHandler}
                                    value={item.value}
                                />} 
                            label={item.label} 
                        />
                    ))
                }
            </FormGroup>
        );
    }, [ xAxe, xAxeChangeHandler ])

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
                            "": <></>,
                            "X_AXE": xAxeElementsListMemo
                        }[open]
                    }
                </div>
            </div>
        </div>
    );
};

export default ChartContainer;