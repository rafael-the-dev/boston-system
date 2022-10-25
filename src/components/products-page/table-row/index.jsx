import * as React from "react";
import TableRow from "@mui/material/TableRow";
import classNames from "classnames";

import classes from "./styles.module.css";

import Link from "src/components/link";
import Popover from "src/components/popover";

const Container = ({ children, idProduto }) => {
    const onOpen = React.useRef(null);

    const clickHandler = (e) => onOpen.current?.(e);

    return (
        <>
            <TableRow className="hover:bg-stone-100 cursor-pointer" onClick={clickHandler}>
                { children }
            </TableRow>
            <Popover
                onClickRef={onOpen}>
                <ul className={classNames(classes.list, "p-4")}>
                    <li className="mb-3"><Link className="text-blue-700 hover:text-blue-500" href="/">Relatorio</Link></li>
                    <li><Link className="text-blue-700 hover:text-blue-500" href={`register-product?id=${idProduto}&role=edit`}>Editar</Link></li>
                </ul>
            </Popover>
        </>
    );
};

export default Container;
