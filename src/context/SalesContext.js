import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { SalesTabContextProvider } from "./SalesTabContext"
import SalesTab from "src/components/reports-page/sales-tab";

const SalesContext = createContext();
SalesContext.displayName = "SalesContext";

const SalesContextProvider = ({ children }) => {
    const [ globalSales, setGlobalSales ] = useState({});
    const [ currentTab, setCurrentTab ] = useState("");
    const [ tabs, setTabs ] = useState([]);

    const getElement = useCallback((id) => (
        <SalesTabContextProvider key={id}>
            <SalesTab tabId={id} />
        </SalesTabContextProvider>
    ), [])

    const addTab = useCallback(() => {
        const id = uuidV4();

        setTabs(currentTabs => {
            const tempList = [ ...currentTabs.filter(item => item.id !== -1) ];

            tempList.push(
                {
                    id,
                    element: getElement(id)
                },
                {
                    id: -1
                }
            );

            return tempList;
        });
        setCurrentTab(id);
    }, []);

    const addCurrentVisibleTab = useCallback((id) => {
        setCurrentTab(id);
        //setTabs(currentTabs => ({ ...currentTabs, currentTab: id }));
    }, [])

    useEffect(() => {
        const id = uuidV4();

        setTabs(
            [
                {
                    id,
                    element: getElement(id)
                },
                {
                    id: -1
                }
            ]
        );
        setCurrentTab(id);
    }, [])

    return (
        <SalesContext.Provider
            value={{
                addTab, addCurrentVisibleTab,
                currentTab,
                globalSales,
                setGlobalSales, setTabs,
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