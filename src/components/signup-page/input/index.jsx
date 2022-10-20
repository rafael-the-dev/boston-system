import * as React from "react";
import classNames from "classnames"
import Typography from "@mui/material/Typography";

import Input from 'src/components/Input';

const DefaultInput = React.forwardRef((props, ref) => {
    const [ value, setValue ] = React.useState('');
    const [ , startTransition ] = React.useTransition();

    const { errors, id, onChange  } = props;
    const hasErrors = () => Boolean(errors[id].length);

    const changeHandler = React.useCallback(e => {
        const currentValue = e.target.value;
        setValue(currentValue)
        startTransition(() => onChange(currentValue));
    }, [])
    console.log(errors[id])
    return (
        <div className="mb-4">
            <Input 
                className={classNames("border border-solid rounded-lg w-full", 
                hasErrors() ? "border-red-600" : "border-blue-600" )}
                error={hasErrors()}
                fullWidth
                ref={ref}
                required
                { ...props }
                onChange={changeHandler}
            />
            { hasErrors() && (
                <ul className="mt-2 pl-3">
                    {
                        errors[id].map((item, index) => (
                            <Typography 
                                className="mb-1 text-red-600 text-xs last:mb-0" 
                                key={index}>
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