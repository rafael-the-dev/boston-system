import { useRouter } from "next/router"

import { SignUpContextProvider, SaleContextProvider, SalesContextProvider } from "src/context"

const ContextProvider = ({ children }) => {
    const { pathname } = useRouter();

    const getProvider = () => {

        return {
            "/sale": <SaleContextProvider>{ children }</SaleContextProvider>,
            "/sign-up": <SignUpContextProvider>{ children }</SignUpContextProvider>,
            "/profile/[id]": <SignUpContextProvider>{ children }</SignUpContextProvider>,
            "/reports": <SalesContextProvider>{ children }</SalesContextProvider>
        }[pathname]
    };

    
    return (
        <>{ getProvider() ?? children }</>
    );
};

export default ContextProvider;