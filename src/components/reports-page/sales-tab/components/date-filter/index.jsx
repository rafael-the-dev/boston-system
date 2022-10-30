import * as React from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from "@mui/material/Button";
import classNames from "classnames";
import moment from "moment"

import SearchIcon from '@mui/icons-material/Search';

import classes from "./styles.module.css";
import { fetchHelper } from "src/helpers/queries";
import { SalesTabContext } from "src/context"

import Input from "src/components/default-input"

const DateFilters = () => {
    const [ loading, setLoading ] = React.useState(false);
    const [ date, setDate ] = React.useState({
        end: "",
        start: ""
    });

    const { getSales } = React.useContext(SalesTabContext);

    const changeHandler = React.useCallback((prop) => (newValue) => {
        setDate(currentDate => ({
            ...currentDate,
            [prop]: newValue
        }))
    }, []);

    const fetchHandler = () => {
        setLoading(true);

        const options = {
            headers: {
                "Authorization": JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token
            }
        };

        fetchHelper({ options, url: `/api/reports?${date.start && `startDate=${date.start}&` }${date.end && `endDate=${date.end}` }` })
            .then(data => {
                setLoading(false);
                getSales().update(data);
            })
            .catch(err => {
                console.error(err)
            })
    };

    return (
        <div className="flex flex-wrap items-center">
            <DesktopDatePicker
                className={classNames(classes.datePicker, "input sm:mr-4 sm:mb-0")}
                label="Date"
                value={date.start}
                minDate={moment('2017-01-01')}
                onChange={changeHandler("start")}
                renderInput={(params) => <Input {...params} />}
            />
            { Boolean(date.start) && <DesktopDatePicker
                className={classNames(classes.datePicker, "input sm:mr-4 sm:mb-0")}
                label="End date"
                value={date.end}
                minDate={moment('2017-01-01')}
                onChange={changeHandler("end")}
                renderInput={(params) => <Input {...params} />}
            /> }
            <Button
                className={classNames("bg-blue-500 py-2 text-white hover:bg-blue-700", {
                    "hidden": !Boolean(date.start) && !Boolean(date.end)
                })}
                onClick={fetchHandler}
                startIcon={<SearchIcon />}
                variant="contained">
                Search
            </Button>
        </div>
    );
};

export default DateFilters;