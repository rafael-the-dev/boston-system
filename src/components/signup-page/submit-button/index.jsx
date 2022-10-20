import Button from "@mui/material/Button";

const DefaultButton = ({ children, disabled }) => (
    <Button 
        className="bg-blue-700 mt-6 py-3 rounded-2xl text-base w-full hover:bg-blue-500"
        disabled={disabled}
        variant="contained"
        type="submit"
    >
        { children }
    </Button>
);

export default DefaultButton;