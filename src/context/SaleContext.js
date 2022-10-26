import { createContext, useCallback, useEffect, useRef, useState } from "react";
import Cart from "src/models/client/Cart";

const SaleContext = createContext();
SaleContext.displayName = "SaleContext";

const SaleContextProvider = ({ children }) => {
    const [ cart, setCart ] = useState([]);

    const cartRef = useRef(null);
    console.log(cart)
    const getCart = useCallback(() => cartRef.current, [])

    useEffect(() => {
        cartRef.current = new Cart(setCart);
    }, []);

    return (
        <SaleContext.Provider 
            value={{
                cart,
                getCart
            }}>
            { children }
        </SaleContext.Provider>
    );
};

export {
    SaleContext,
    SaleContextProvider
}