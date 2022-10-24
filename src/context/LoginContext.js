import { createContext, useCallback, useContext, useMemo, useState } from "react";

const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

const LoginContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const loggedUser = useMemo(() => {
        if(user) return user;

        return {
            access: {
                loginId: "",
                token: "",

            },
            category: "",
            firstName: "",
            lastName: "",
            username: ""
        };
    }, [ user ]);

    const addUser = useCallback((newUser) => setUser(newUser), []);

    const logoutHelper = useCallback(async () => {
        const options = {
            body: JSON.stringify({
                loginId: loggedUser.access.loginId,
                username: loggedUser.username
            }),
            method: "PUT"
        };

        await fetch("/api/logout", options);
        return;
    }, [ loggedUser ])

    return (
        <LoginContext.Provider
            value={{ 
                addUser,
                logoutHelper,
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