import * as React from "react";
import axios from "axios"
import Button from "@mui/material/Button";
import { createPortal } from "react-dom";
import ReactDOMServer from "react-dom/server";

import classes from "./styles.module.css"

import { CheckoutContext } from "src/context";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrintIcon from '@mui/icons-material/Print';
import Receipt from "src/components/sale-page/receipt"

const SuccessfulPaymentPanel = ({ onClose, salesSerie, setPanel }) => {
    const { getPaymentMethods } = React.useContext(CheckoutContext);

    const [ receipt, setReceipt ] = React.useState(null);

    const closeHandler = () => {
        getPaymentMethods().cart.reset();
        getPaymentMethods().reset();
        setPanel("PAYMENTMETHODS")
        onClose();
    };

    const printHandler = () => {
        const iframeRef = document.querySelector("#print-iframe");
        closeHandler();

        iframeRef.focus();
        iframeRef.contentWindow.print();
    };

    const fetchData = React.useCallback(async () => {
        const options = {
            baseURL: process.env.SERVER,
            headers: {
                Authorization: JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token,
            },
        };

        try {
            const res = await axios(`/api/receipts/${salesSerie.current}`, options);
            
            if(res.status === 200) {
                setReceipt(res.data);
                document.querySelector("#print-iframe").srcdoc = ReactDOMServer.renderToString(<Receipt { ...res.data } />);
            };
        } catch(e) {
            console.error(e)
        }
    }, [ salesSerie ]);

    React.useEffect(() => {
        fetchData();
    }, [ fetchData ]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex grow items-center justify-center">
                <CheckCircleIcon className={classes.icon} />
            </div>
            <div className="flex justify-end p-4">
                <Button 
                    className='border-blue-500 text-blue-500 mr-3 hover:bg-blue-500 hover:text-white'
                    disabled={!Boolean(receipt)}
                    onClick={printHandler}
                    variant="outlined"
                    startIcon={<PrintIcon />}>
                    Print
                </Button>
                <Button
                    className="bg-red-500 py-4 px-8 text-white hover:bg-red-700"
                    onClick={closeHandler}
                    variant="contained">
                    Close
                </Button>
            </div>
        </div>
    );
};

export default SuccessfulPaymentPanel;

/**>
                { Boolean(receipt) && createPortal(<Receipt { ...receipt } />, iframeRef.current?.contentWindow?.document?.body) }
            </iframe */