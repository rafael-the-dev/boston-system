import { createContext, useCallback, useContext, useMemo, useState } from "react";

const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

const LoginContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const loggedUser = useMemo(() => {
        if(user) return user;

        return {
            category: "",
            firstName: "",
            lastName: "",
            username: ""
        };
    }, [ user ]);

    const addUser = useCallback((newUser) => setUser(newUser), [])

    return (
        <LoginContext.Provider
            value={{ 
                addUser,
                loggedUser,
                user
            }}>
            { children }
        </LoginContext.Provider>
    );
};

export {
    LoginContext,
    LoginContextProvider
}