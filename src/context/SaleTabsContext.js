import * as React from "react";
import { v4 as uuidV4 } from "uuid";

import { SaleContextProvider } from "./SaleContext";
import { fetchHelper, getAuthorizationHeader } from "src/helpers/queries";

import Product from "src/models/client/Product"

import PageComponent from "src/components/sale-page/page"

const SaleTabsContext = React.createContext();
SaleTabsContext.displayName = "SaleTabsContext";

const SaleTabsContextProvider = ({ children }) => {
    const [ categories, setCategories ] = React.useState([]);
    const [ productsList, setProductsList ] = React.useState([]);
    const [ tabs, setTabs ] = React.useState({
        list: [],
        selectedTab: ""
    });

    const createPage = React.useCallback((id) => ({
        element: <SaleContextProvider key={id}><PageComponent tabId={id} /></SaleContextProvider>,
        id,
    }), []);

    const getTabs = React.useCallback(() => tabs, [ tabs ]);
    
    const getCurrentTab = React.useCallback(() => tabs.selectedTab, [ tabs ]);
    const setCurrentTab = React.useCallback((id) => setTabs(currentTabs => {
        if(currentTabs.selectedTab === id) return currentTabs;

        return {  ...currentTabs, selectedTab: id };
    }), [])

    // add brand new tab
    const addTab = React.useCallback(() => {
        const id = uuidV4();

        setTabs(currentTabs => {
            // Insert up to 5 pages
            if(currentTabs.list.length >= 5) return currentTabs;

            return { list: [ ...currentTabs.list, createPage(id) ], selectedTab: id };
        });
    }, [ createPage ]);

    // remove selected tab from the list
    const removeTab = React.useCallback(id => {
        setTabs(currentTabs => {
            // Remove page only if the list is greater than or equal to 2
            if(currentTabs.list.length <= 1) return currentTabs;

            const list = currentTabs.list.filter(item => item.id !== id);

            return {
                list,
                selectedTab: list[list.length - 1].id
            }
        })
    }, []);

    const fetchProducts = React.useCallback(async () => {
        try {
            const options = { ...getAuthorizationHeader() };

            const data = await fetchHelper({ options, url: "/api/stocks" });
            setProductsList(data)
        }
        catch(e) {
            console.error(e)
        }
    }, [])

    const products = React.useMemo(() => productsList.map(product => new Product(product)), [ productsList ])

    React.useEffect(() => {
        fetchProducts();
    }, [ fetchProducts ]);

    // create first tab on component mount if the list is empty
    React.useEffect(() => {
        setTabs(currentTabs => {
            if(currentTabs.list.length > 0) return currentTabs;

            const id = uuidV4();

            return { list: [ createPage(id) ], selectedTab: id }
        });
    }, [ createPage ]);

    return (
        <SaleTabsContext.Provider
            value={{
                addTab,
                categories,
                getTabs, getCurrentTab,
                products,
                removeTab,
                setCategories, setCurrentTab
            }}>
            { children }
        </SaleTabsContext.Provider>
    );
};

export {
    SaleTabsContext,
    SaleTabsContextProvider
};