import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Validation from "src/models/Validation";

const SignUpContext = createContext();
SignUpContext.displayName = "SignUpContext";

const SignUpContextProvider = ({ children }) => {
    const [ firstNameError, setFirstNameError ] = useState([]);
    const [ lastNameError, setLastNameError ] = useState([]);
    const [ user, setUser ] = useState("Administrator");
    const [ usernameError, setUserNameError ] = useState([]);
    const [ confirmPassword, setConfirmPassword ] = useState({
        error: [],
        value: ""
    });
    const [ password, setPassword ] = useState({
        error: [],
        value: ""
    });

    const passwordRef = useRef("");
    const userRef = useRef("Administrator")

    const childrenMemo = useMemo(() => <>{ children }</>, [ children ]);

    const onSubmit = useCallback((details) => {
       const body = JSON.stringify({
            ...details,
            password: passwordRef.current,
            user: userRef.current
       })

       fetch('/api/users', {
            body,
            method: "POST"
       }).then(res => {

       }).catch(console.error);

    }, [])

    const hasErrors = useMemo(() => {
        return Boolean(confirmPassword.error.length, password.error.length + firstNameError.length + lastNameError.length + usernameError.length);
    }, [ confirmPassword, firstNameError, lastNameError, password, usernameError ]);

    const firstNameChangeHandler = useCallback((value) => {
        const nameErrors = [];
        
        Validation.checkLength({ min: 2, value: value.trim(), onError: (error) => nameErrors.push(error) });
        Validation.hasNumbers({ min: 1, value, onError: () => {}, onSuccess: () => nameErrors.push({ name: "", message: "Must not contain numbers" })})
        Validation.hasSpecialChars({ value: value.trim(), onSuccess: (error) => nameErrors.push(error) });

        setFirstNameError(nameErrors);
    }, []);

    const lastNameChangeHandler = useCallback((value) => {
        const nameErrors = [];
        
        Validation.checkLength({ min: 2, value: value.trim(), onError: (error) => nameErrors.push(error) });
        Validation.hasNumbers({ min: 1, value, onError: () => {}, onSuccess: () => nameErrors.push({ name: "", message: "Must not contain numbers" })})
        Validation.hasSpecialChars({ value: value.trim(), onSuccess: (error) => nameErrors.push(error) });

        setLastNameError(nameErrors);
    }, []);

    const usernameChangeHandler = useCallback((value) => {
        const usernameErrors = [];

        Validation.hasWhitespace({ value, onSuccess: (error) => usernameErrors.push(error) });
        Validation.checkLength({ min: 8, value, onError: (error) => usernameErrors.push(error) });
        Validation.hasSpecialChars({ value, onSuccess: (error) => usernameErrors.push(error) });

        setUserNameError(usernameErrors);
    }, [])

    const passwordChangeHandler = useCallback(value => {
        const passwordErrors = [];

        Validation.startWithUppercaseLetter({ value, onError: error => passwordErrors.push(error) })
        Validation.hasNumbers({ value, onError: (error) => passwordErrors.push(error)})
        Validation.hasWhitespace({ value, onSuccess: (error) => passwordErrors.push(error) });
        Validation.checkLength({ min: 8, value, onError: (error) => passwordErrors.push(error) });

        setPassword({
            error: passwordErrors,
            value
        });
    }, []);

    const confirmPasswordChangeHandler = useCallback((value) => {
        const passwordErrors = [];

        if(value !== password.value) {
            passwordErrors.push({
                message: "Passwords don't match",
                name: ""
            })
        }

        setConfirmPassword({
            error: passwordErrors,
            value
        });
    }, [ password ]);

    useEffect(() => {
        passwordRef.current = password.value;

        setConfirmPassword(currentConfirmedPassword => {
            const passwordErrors = [];

            if(!currentConfirmedPassword.value) return currentConfirmedPassword;

            if(currentConfirmedPassword.value !== password.value) {
                passwordErrors.push({
                    message: "Passwords don't match",
                    name: ""
                })
            }
            
            return {
                ...currentConfirmedPassword,
                error: passwordErrors,
            }
        });
    }, [ password ]);

    useEffect(() => {
        userRef.current = user;
    }, [ user ])

    return (
        <SignUpContext.Provider
            value={{ 
                confirmPassword, confirmPasswordChangeHandler,
                firstNameError, firstNameChangeHandler,
                hasErrors,
                lastNameError, lastNameChangeHandler,
                onSubmit,
                password, passwordChangeHandler,
                setUser,
                user, usernameError, usernameChangeHandler
            }}>
            { childrenMemo }
        </SignUpContext.Provider>
    );
};

export {
    SignUpContext,
    SignUpContextProvider
}