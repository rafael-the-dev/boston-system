import * as React from "react";
import Button from "@mui/material/Button";
import currency from "currency.js";

import { AddStockContext } from "src/context";

import BarcodeScanner from "./components/barcode-scanner";
import Table from "./components/table";
import TextField from "src/components/default-input";

const ContentContainer = ({ productsList }) => {
    const { addProduct } = React.useContext(AddStockContext);

    const [ product, setProduct ] = React.useState(null);

    const productRef = React.useRef(null);
    const quantityInputRef = React.useRef(null);

    const barCodeScannerMemo = React.useMemo(() => <BarcodeScanner productsList={productsList} setProduct={setProduct} />, [ productsList ])
    const tableMemo = React.useMemo(() => product ? <Table product={product} /> : <></>, [ product ]);

    const clickHandler = React.useCallback(() => {
        if(!Boolean(productRef.current)) return;

        addProduct(productRef.current);
        quantityInputRef.current.value = "";
        setProduct(null);
    }, [ addProduct ]);

    const quantityChangeHandler = React.useCallback(e => {
        productRef.current.stock.quantity = e.target.value;
        productRef.current.stock.total = currency(productRef.current.stock.quantity).add(productRef.current.stock.currentStock).value;
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
            <div className="flex justify-end">
                <Button
                    className="bg-neutral-700 py-2 text-white hover:bg-neutral-600"
                    disabled={!Boolean(product)}
                    onClick={clickHandler}
                    variant="contained">
                    Add
                </Button>
            </div>
        </div>
    );
};

export default ContentContainer;