import { createContext, useCallback, useEffect, useRef, useState } from "react";
import Cart from "src/models/client/Cart";
import Payment from "src/models/client/Payment";

const SaleContext = createContext();
SaleContext.displayName = "SaleContext";

const SaleContextProvider = ({ children }) => {
    const [ cart, setCart ] = useState([]);
    const [ paymentMethods, setPaymentMethods ] = useState([])

    const cartRef = useRef( new Cart(setCart));
    const paymentMethodsRef = useRef( new Payment(setPaymentMethods))
    
    const getCart = useCallback(() => cartRef.current, []);
    const getPaymentMethods = useCallback(() => paymentMethodsRef.current, []);

    useEffect(() => {
        getPaymentMethods().cart = getCart();
    }, [ getCart ]);

    return (
        <SaleContext.Provider 
            value={{
                cart,
                getCart,
                getPaymentMethods,
                paymentMethods
            }}>
            { children }
        </SaleContext.Provider>
    );
};

export {
    SaleContext,
    SaleContextProvider
}