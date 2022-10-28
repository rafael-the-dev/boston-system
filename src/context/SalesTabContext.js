import { createContext, useCallback, useRef, useState } from "react";

const SalesTabContext = createContext();
SalesTabContext.displayName = "SalesTabContext";

const SalesTabContextProvider = ({ children }) => {
    const [ sales, setSales ] = useState({});

    return (
        <SalesTabContext.Provider
            value={{
                sales,
                setSales,
                tabs,
            }}>
            { children }
        </SalesTabContext.Provider>
    );
};

export {
    SalesTabContext,
    SalesTabContextProvider
}