import * as React from "react"

import Input from 'src/components/Input';

const DefaultInput = React.forwardRef((props, ref) => (
    <Input 
        className="border border-solid border-blue-600 mb-4 rounded-lg w-full"
        fullWidth
        ref={ref}
        required
        { ...props }
    />
));

DefaultInput.displayName = "Input";

export default DefaultInput;