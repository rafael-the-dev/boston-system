import { useRouter } from "next/router"

import { AddStockContextProvider, SignUpContextProvider, SaleTabsContextProvider, SalesContextProvider } from "src/context"

const ContextProvider = ({ children }) => {
    const { pathname } = useRouter();

    const getProvider = () => {

        return {
            "/add-stock": <AddStockContextProvider>{ children }</AddStockContextProvider>,
            "/sale": <SaleTabsContextProvider>{ children }</SaleTabsContextProvider>,
            "/sign-up": <SignUpContextProvider>{ children }</SignUpContextProvider>,
            "/users/[id]": <SignUpContextProvider>{ children }</SignUpContextProvider>,
            "/sales": <SalesContextProvider>{ children }</SalesContextProvider>
        }[pathname]
    };

    
    return (
        <>{ getProvider() ?? children }</>
    );
};

export default ContextProvider;