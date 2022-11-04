import * as React from "react";
import { Collapse, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from "@mui/material";

import DatePicker from "../date-filter";

const FiltersContainer = ({ onToggle }) => {
    const [ open, setOpen ] = React.useState(false);
    const [ value, setValue ] = React.useState("DATE");

    const controls = React.useRef([
        { label: 'Date', value: "DATE" },
        { label: 'Chart', value: "CHART" }
    ]);

    const changeHandler = React.useCallback(e => setValue(e.target.value), []);

    const datePickerMemo = React.useMemo(() => <DatePicker onClose={() => setOpen(false)} />, []);

    const childrenList = React.useRef({
        "DATE": datePickerMemo
    })

    const filtersMemo = React.useMemo(() => (
        <Paper 
            className="p-4"
            elevation={0}>
            <FormControl>
                <FormLabel id="filters-title">Filters</FormLabel>
                <RadioGroup
                    aria-labelledby="filters-title"
                    name="radio-buttons-group"
                    row
                >
                    {
                        controls.current.map(item => (
                            <FormControlLabel 
                                { ...item } 
                                control={<Radio checked={value === item.value} onChange={changeHandler} />} 
                                key={item.value}
                            />
                        ))
                    }
                </RadioGroup>
            </FormControl>
            <div className="pt-3">
                { childrenList.current[value] }
            </div>
        </Paper>
    ), [ changeHandler, value ])

    React.useEffect(() => {
        onToggle.current = () => setOpen(b => !b);
    }, [ onToggle ]);

    return (
        <Collapse className="mx-5 mb-8" in={open} unmountOnExit>
            { filtersMemo }
        </Collapse>
    );
};

export default FiltersContainer;