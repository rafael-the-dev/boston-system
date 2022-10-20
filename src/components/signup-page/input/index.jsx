import * as React from "react";
import classNames from "classnames"
import Typography from "@mui/material/Typography";
import { v4 as uuuidV4 } from "uuid"

import Input from 'src/components/Input';

const DefaultInput = React.forwardRef((props, ref) => {
    const [ value, setValue ] = React.useState('');

    const { errors, id, onChange  } = props;
    const hasErrors = () => Boolean(errors[id].length);

    const changeHandler = React.useCallback(e => {
        const currentValue = e.target.value;
        setValue(currentValue)
        onChange(currentValue);
    }, [ onChange ]);

    return (
        <div className="mb-4">
            <Input 
                { ...props }
                className={classNames("border border-solid rounded-lg w-full", 
                hasErrors() ? "border-red-600" : "border-blue-600" )}
                error={hasErrors()}
                fullWidth
                onChange={changeHandler}
                ref={ref}
                required
                value={value}
            />
            { hasErrors() && (
                <ul className="mt-2 pl-3">
                    {
                        errors[id].map((item) => (
                            <Typography 
                                className="mb-1 text-red-600 text-xs last:mb-0" 
                                key={uuuidV4()}>
                                * { item.message }
                            </Typography>
                        ))
                    }
                </ul>
            )}
        </div>
    );
});

DefaultInput.displayName = "Input";

export default DefaultInput;