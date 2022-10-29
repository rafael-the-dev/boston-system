import * as React from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from "@mui/material/Button";
import classNames from "classnames";
import moment from "moment"

import SearchIcon from '@mui/icons-material/Search';

import classes from "./styles.module.css";

import Input from "src/components/default-input"

const DateFilters = () => {
    const [ date, setDate ] = React.useState({
        end: "",
        start: ""
    });

    const changeHandler = React.useCallback((prop) => (newValue) => {
        setDate(currentDate => ({
            ...currentDate,
            [prop]: newValue
        }))
    }, [])

    return (
        <div className="flex items-center">
            <DesktopDatePicker
                className={classNames(classes.datePicker, "input sm:mr-4 sm:mb-0")}
                label="Start date"
                value={date.start}
                minDate={moment('2017-01-01')}
                onChange={changeHandler("start")}
                renderInput={(params) => <Input {...params} />}
            />
            <DesktopDatePicker
                className={classNames(classes.datePicker, "input sm:mr-4 sm:mb-0")}
                label="End date"
                value={date.end}
                minDate={moment('2017-01-01')}
                onChange={changeHandler("end")}
                renderInput={(params) => <Input {...params} />}
            />
            <Button
                className={classNames("bg-blue-500 py-2 text-white hover:bg-blue-700", {
                    "hidden": !Boolean(date.start) && !Boolean(date.end)
                })}
                startIcon={<SearchIcon />}
                variant="contained">
                Search
            </Button>
        </div>
    );
};

export default DateFilters;