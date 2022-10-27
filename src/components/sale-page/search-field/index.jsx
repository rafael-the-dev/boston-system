import * as React from "react";
import { ClickAwayListener, Paper } from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import { SaleContext } from "src/context";
import CartItem from "src/models/client/CartItem"

import Input from "src/components/default-input";
import Table from "./components/table"

const Container = ({ products }) => {
    const { getCart } = React.useContext(SaleContext);

    const [ barCode, setBarCode ] = React.useState("");
    
    const headers = React.useRef([
        { key: "barCode", label: "Codigo de barra" },
        { key: "name", label: "Nome" },
    ]);

    const filteredList = React.useMemo(() => {
        return products.filter(product => product.barCode.includes(barCode));
    }, [ barCode, products ])

    const barCodeChangeHandler = React.useCallback(e => {
        setBarCode(e.target.value);
    }, []);

    const handleClickAway = React.useCallback(() => setBarCode(""), []);

    React.useEffect(() => {
        if(barCode.trim()) {
            const product = products.find(item => item.barCode === barCode);
            
            if(Boolean(product) && !getCart().hasProduct(product.id)) {
                getCart().addItem( new CartItem(product, 1));
                setBarCode("");
            }
        }
    }, [ barCode, getCart, products ])

    return (
        <div className="input relative w12">
            <Input 
                className="w-full"
                label="codigo de barra"
                onChange={barCodeChangeHandler}
                value={barCode}
            />
            { Boolean(barCode) && (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Paper 
                        className={classNames(classes.tableContainer, "absolute bottom-0 left-0 overflow-y-auto w-full")}>
                        <Table 
                            data={filteredList}
                            headers={headers}
                            onClose={handleClickAway}
                        />
                    </Paper>
                </ClickAwayListener>
            )}
        </div>
    );
};

export default Container;