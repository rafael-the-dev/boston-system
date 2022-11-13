import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxContainer = ({ checked, label, onChange }) => (
    <FormControlLabel 
        control={<Checkbox checked={checked} onChange={onChange} />} 
        label={label}
    />
);

export default CheckboxContainer;