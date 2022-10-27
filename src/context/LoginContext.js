import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";

const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

const LoginContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const isFirstRender = useRef(true);

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
    }, [ loggedUser ]);

    useEffect(() => {
        if(isFirstRender.current) isFirstRender.current = false;

        try {
            let savedData = JSON.parse(localStorage.getItem("__cybersys-stock-management-app__"));

            if(user) {
                savedData = { ...savedData, user: user.access }
            } else {
                savedData = { ...savedData, user: {} }
            }

            localStorage.setItem("__cybersys-stock-management-app__", JSON.stringify(savedData))


        } catch(e) {
            localStorage.setItem("__cybersys-stock-management-app__", JSON.stringify({ user: {} }))
        }
    }, [ user ])

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