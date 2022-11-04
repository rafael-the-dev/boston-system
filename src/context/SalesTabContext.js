import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { SalesContext } from "./SalesContext"
import Sales from "src/models/client/Sales";

const SalesTabContext = createContext();
SalesTabContext.displayName = "SalesTabContext";

const SalesTabContextProvider = ({ children }) => {
    const { globalSales } = useContext(SalesContext);
    const [ sales, setSales ] = useState({});
    const [ selectedSale, setSelectedSale ] = useState([])

    const salesRef = useRef(new Sales(setSales));

    const getSales = useCallback(() => {
        console.log(sales);
        return salesRef.current;
    }, [ sales ]);

    useEffect(() => {
        if(Object.keys(globalSales).length > 0)
            getSales().update(globalSales);
    }, [ globalSales, getSales ])

    return (
        <SalesTabContext.Provider
            value={{
                getSales,
                sales, selectedSale,
                setSales, setSelectedSale
            }}>
            { children }
        </SalesTabContext.Provider>
    );
};

export {
    SalesTabContext,
    SalesTabContextProvider
}