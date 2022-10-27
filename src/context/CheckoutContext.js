import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { SaleContext } from "./SaleContext";

import Payment from "src/models/client/Payment"

const CheckoutContext = createContext();
CheckoutContext.displayName = "CheckoutContext";

const CheckoutContextProvider = ({ children }) => {
    const { getCart } = useContext(SaleContext);

    const [ paymentMethods, setPaymentMethods ] = useState([])
    
    const paymentMethodsRef = useRef( new Payment(setPaymentMethods))

    const getPaymentMethods = useCallback(() => paymentMethodsRef.current, []);

    useEffect(() => {
        getPaymentMethods().cart = getCart();
    }, [ getCart ]);

    return (
        <CheckoutContext.Provider
            value={{
                getPaymentMethods,
                paymentMethods
            }}>
            { children }
        </CheckoutContext.Provider>
    );
};

export {
    CheckoutContext,
    CheckoutContextProvider
}