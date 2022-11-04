import { createContext, useCallback, useEffect, useRef, useState } from "react";
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

    return (
        <SaleContext.Provider 
            value={{
                cart,
                getCart,
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