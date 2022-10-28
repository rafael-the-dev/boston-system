import { createContext, useCallback, useRef, useState } from "react";

import Sales from "src/models/client/Sales";

const SalesContext = createContext();
SalesContext.displayName = "SalesContext";

const SalesContextProvider = ({ children }) => {
    const [ sales, setSales ] = useState({});
    const [ tabs, setTabs ] = useState([]);

    const salesRef = useRef(new Sales(setSales));

    const getSales = useCallback(() => salesRef.current, []);

    return (
        <SalesContext.Provider
            value={{
                getSales,
                sales,
                setSales, setTabs,
                tabs,
            }}>
            { children }
        </SalesContext.Provider>
    );
};

export {
    SalesContext,
    SalesContextProvider
}