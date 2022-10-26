import { useRouter } from "next/router"

import { SaleContextProvider } from "src/context"

const ContextProvider = ({ children }) => {
    const { pathname } = useRouter();

    if(pathname === "/sale") {
        return (
            <SaleContextProvider>
            { children }
        </SaleContextProvider>
    )}
    
    return (
        <>{ children }</>
    );
};

export default ContextProvider;