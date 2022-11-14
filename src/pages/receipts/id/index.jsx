import * as React from "react";
import axios from "axios"

import Receipt from "src/components/sale-page/receipt"

const Container = () => {
    const [ receipt, setReceipt ] = React.useState({ 
        products: [], paymentMethods: [],
        stats: {
            subTotal: 0,
            totalAmount: 0,
            totalVAT: 0
        }
    });

    const fetchData = React.useCallback(async () => {
        const options = {
            baseURL: process.env.SERVER,
            headers: {
                Authorization: JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token,
            },
        };

        try {
            const res = await axios(`/api/receipts/${2}`, options);
            
            if(res.status === 200) {
                setReceipt(res.data)
            };
        } catch(e) {
            console.error(e)
        }
    }, [ ]);

    React.useEffect(() => {
        fetchData();
    }, [ fetchData ])

    return (
        <Receipt { ...receipt } />
    );
};

export default Container;