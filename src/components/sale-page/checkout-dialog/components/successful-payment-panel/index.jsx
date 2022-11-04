import * as React from "react";
import axios from "axios"
import Button from "@mui/material/Button";

import classes from "./styles.module.css"

import { CheckoutContext } from "src/context";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrintIcon from '@mui/icons-material/Print';


const SuccessfulPaymentPanel = ({ onClose, salesSerie, setPanel }) => {
    const { getPaymentMethods } = React.useContext(CheckoutContext);

    const closeHandler = () => {
        getPaymentMethods().cart.reset();
        getPaymentMethods().reset();
        setPanel("PAYMENTMETHODS")
        onClose();
    };

    const printHandler = () => {
        closeHandler();

        const iframeElement = document.querySelector("#print-iframe");

        iframeElement.onload = () => {
           // setTimeout(() => {
                iframeElement.focus();
                iframeElement.contentWindow.print();
                blobRef.current = null;
           // }, 1);
        };
    };

    const fetchData = React.useCallback(async () => {
        const options = {
            baseURL: process.env.SERVER,
            headers: {
                Accept: "application/pdf",
                Authorization: JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token,
                "content-type": "application/pdf"
            },
            responseType: "blob"
        }

        try {
            const res = await axios(`/api/receipts/${salesSerie.current}`, options);
            
            if(res.status === 200) {
                
                const blob = new Blob([ res.data ], { type: 'application/pdf' }); 
                const blobURL = URL.createObjectURL(blob);
                
                const iframeElement = document.querySelector("#print-iframe");
                iframeElement.src = blobURL;
            };
        } catch(e) {
            console.error(e)
        }
    }, [ salesSerie ]);

    React.useEffect(() => {
        fetchData();
    }, [ fetchData ])

    return (
        <div className="flex flex-col h-full">
            <div className="flex grow items-center justify-center">
                <CheckCircleIcon className={classes.icon} />
            </div>
            <div className="flex justify-end p-4">
                <Button 
                    className='border-blue-500 text-blue-500 mr-3 hover:bg-blue-500 hover:text-white'
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