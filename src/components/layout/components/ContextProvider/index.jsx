import { useRouter } from "next/router"

import { SignUpContextProvider, SaleContextProvider } from "src/context"

const ContextProvider = ({ children }) => {
    const { pathname } = useRouter();

    if(pathname === "/sale") {
        return (
            <SaleContextProvider>
            { children }
        </SaleContextProvider>
    )}

    if((pathname === "/sign-up") || ( pathname === '/profile/[id]')) {
        return (
            <SignUpContextProvider>
                { children }
            </SignUpContextProvider>
        );
    }
    
    return (
        <>{ children }</>
    );
};

export default ContextProvider;