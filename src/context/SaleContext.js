import { createContext, useCallback, useMemo, useRef, useState } from "react";
import currency from "currency.js"

import Cart from "src/models/client/Cart";
import Payment from "src/models/client/Payment";

const SaleContext = createContext();
SaleContext.displayName = "SaleContext";

const SaleContextProvider = ({ children }) => {
    const [ cart, setCart ] = useState([]);

    const cartRef = useRef( new Cart(setCart));
    
    const getCart = useCallback(() => {
        if(cart){}
        return cartRef.current;
    }, [ cart ]);

    const hasQuantityError = useMemo(() => {
        return getCart().list.find(item => {
            return currency(item.quantity).value > item.product.stock.currentStock || currency(item.quantity).value <= 0;
        })
    }, [ getCart ])

    return (
        <SaleContext.Provider 
            value={{
                cart,
                getCart,
                hasQuantityError
                //getPaymentMethods,
                //paymentMethods
            }}>
            { children }
        </SaleContext.Provider>
    );
};

export {
    SaleContext,
    SaleContextProvider
}