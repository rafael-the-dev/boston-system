import * as React from "react";
import currency from "currency.js";
import classNames from "classnames"
import { Typography } from "@mui/material";

import { AddStockContext } from "src/context";

import BarcodeScanner from "./components/barcode-scanner";
import PrimaryButton from "src/components/primary-button"
import Table from "./components/table";
import TextField from "src/components/default-input";

const ContentContainer = ({ productsList }) => {
    const { addProduct, getProductsList } = React.useContext(AddStockContext);

    const [ product, setProduct ] = React.useState(null);
    const [ quantity, setQuantity ] = React.useState(0);

    const productRef = React.useRef(null);
    const quantityInputRef = React.useRef(null);

    const barCodeScannerMemo = React.useMemo(() => <BarcodeScanner productsList={productsList} setProduct={setProduct} />, [ productsList ])
    const tableMemo = React.useMemo(() => product ? <Table product={product} /> : <></>, [ product ]);

    const hasProduct = Boolean(product);
    const hasQuantity = currency(quantity).value > 0;
    const isAdded = getProductsList().find(item => item.id === product?.id);
    const canISubmit = hasProduct && hasQuantity && !isAdded;

    const clickHandler = React.useCallback(() => {
        if(!Boolean(productRef.current)) return;

        addProduct(productRef.current);
        quantityInputRef.current.value = "";
        setProduct(null);
    }, [ addProduct ]);

    const quantityChangeHandler = React.useCallback(e => {
        const { value } = e.target;
        
        productRef.current.stock.quantity = value;
        //productRef.current.purchasePrice = currency()
        productRef.current.stock.total = currency(productRef.current.stock.quantity).add(productRef.current.stock.currentStock).value;
        
        setQuantity(value);
    }, [])

    React.useEffect(() => {
        productRef.current = product ? Object.assign(product, {}) : product;
    }, [ product ]);

    return (
        <div>
            <div className="flex flex-wrap justify-between">
                { barCodeScannerMemo }
                <TextField 
                    className="input w12"
                    inputRef={quantityInputRef}
                    label="Quantity"
                    onChange={quantityChangeHandler}
                    inputProps={{ readOnly: !Boolean(product)}}
                />
            </div>
            { tableMemo }
            <div className="flex flex-col items-end justify-between sm:flex-row sm:items-center">
                { isAdded && <Typography className="text-red-600 text-sm" component="label">
                    Product was already added
                </Typography> }
                <PrimaryButton
                    classes={{ button: classNames({ "mt-4 sm:mt-0": isAdded }) }}
                    disabled={!canISubmit}
                    onClick={clickHandler}>
                    Add
                </PrimaryButton>
            </div>
        </div>
    );
};

export default ContentContainer;