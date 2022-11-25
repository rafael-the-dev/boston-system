import classNames from "classnames";
import moment from "moment";
import { TableCell, TableRow } from "@mui/material"

const TableRowContainer = ({ headers, onClick, row }) => {
    
    const getLabel = (header) => {
        const { key, value } = header;

        if(key) {
            return value === "date" ? moment(row[key][value]).format("DD/MM/YYYY HH:mm:ss") : row[key][value];
        } 

        return value === "date" ? moment(row[value]).format("DD/MM/YYYY HH:mm:ss") : row[value]
    };

    return (
        <TableRow 
            className={classNames({ "cursor-pointer hover:bg-stone-100": Boolean(onClick) })}
            onClick={onClick && onClick(row)}>
            {
                headers.current.map(header => (
                    <TableCell
                        align="center"
                        key={header.value}>
                        { getLabel(header) }
                    </TableCell>
                ))
            }
        </TableRow>
    );
};

export default TableRowContainer;