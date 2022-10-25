import Typography from "@mui/material/Typography";

const Panel = ({ children, title, titleComponent }) => {

    return (
        <div className="bg-blue-500 px-5 py-6 xl:py-8 ">
            <Typography
                component={ titleComponent ?? "h1" }
                className="capitalize text-center text-xl text-white w-fullxl:text-2xl">
                { title }
            </Typography>
            { children }
        </div>
    );
};

export default Panel;