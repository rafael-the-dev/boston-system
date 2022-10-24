import { Alert, AlertTitle, MenuItem, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

import classNames from 'classnames'
import classes from "./styles.module.css";

import Validation from "src/models/Validation";
import { SignUpContext, SignUpContextProvider } from "src/context"

import { Button, Input } from "src/components/signup-page";
import DefaultInput from "src/components/default-input"

const SignUpContainer = ({ children }) => (
    <SignUpContextProvider>
        { children }
    </SignUpContextProvider>
);

const SignUpContent = () => {
    const { 
        confirmPassword, confirmPasswordChangeHandler,
        firstNameError, firstNameChangeHandler,
        hasErrors,
        lastNameError, lastNameChangeHandler,
        onSubmit, 
        password, passwordChangeHandler,
        setUser,
        user, usernameError, usernameChangeHandler
     } = useContext(SignUpContext);

    const users = useRef([
        {
            label: "Administrador", value: "Administrator"
        },
        {
            label: "Gerente", value: "Manager"
        },
        {
            label: "Operador", value: "Operator"
        }
    ]);

    const confirmPasswordRef = useRef(null);
    const nameRef = useRef(null);
    const firstNameRef = useRef(null)
    const passwordRef = useRef(null);
    const lastNameRef = useRef(null);
    const userNameRef = useRef(null);

    const changeHandler = useCallback((e) => setUser(e.target.value), [])

    const legendMemo = useMemo(() => (
        <Typography 
            component="legend"
            className="font-bold mb-8 text-center text-2xl uppercase  dark:text-slate-300">
            Sign up
        </Typography>
    ), []);

    const firstNameMemo = useMemo(() => (
        <Input 
            errors={firstNameError}
            id="name"
            onChange={firstNameChangeHandler}
            placeholder="Primeiro nome"
            ref={firstNameRef}
        />
    ), [ firstNameError, firstNameChangeHandler ])

    const lastNameMemo = useMemo(() => (
        <Input 
            errors={lastNameError}
            id="name"
            onChange={lastNameChangeHandler}
            placeholder="Ultimo nome"
            ref={lastNameRef}
        />
    ), [ lastNameError, lastNameChangeHandler ])

    const usernameMemo = useMemo(() => (
        <Input 
            errors={usernameError}
            id="username"
            onChange={usernameChangeHandler}
            placeholder="Nome do usuario"
            ref={userNameRef}
        />
    ), [ usernameError, usernameChangeHandler ]);

    const userTypeMemo = useMemo(() => (
        <DefaultInput 
            classes={{ root: "mt-1 sign-up-select" }}
            fullWidth
            label="Tipo de usuario"
            onChange={changeHandler}
            select
            value={user}
        >
            {
                users.current.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        { item.label }
                    </MenuItem>
                ))
            }
        </DefaultInput>
    ), [ changeHandler, user ]);

    const passwordMemo = useMemo(() => (
        <Input 
            errors={password.error}
            id="password"
            onChange={passwordChangeHandler}
            placeholder="Palavra-passe"
            ref={passwordRef}
        />
    ), [ password, passwordChangeHandler ]);

    const confirmPasswordMemo = useMemo(() => (
        <Input 
            errors={confirmPassword.error}
            id="confirm-password"
            onChange={confirmPasswordChangeHandler}
            placeholder="Comfirme palavra-passe"
            ref={confirmPasswordRef}
        />
    ), [ confirmPassword, confirmPasswordChangeHandler ]);

    const signInMemo = useMemo(() => (
        <Typography component="p" className="ml-4 text-sm text-center dark:text-slate-400">
            have an account? 
            <Link href="/login">
                <a 
                    className={classNames(classes.signUpLink, 
                    "ml-2 text-blue-700 uppercase underline hover:opacity-90")}>
                    sign in.
                </a>
            </Link>
        </Typography>
    ), []);

    const submitHandler = useCallback(e => {
        e.preventDefault();

        onSubmit({
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            username: userNameRef.current.value
        })
    }, [ onSubmit ])

    return (
        <div className="min-h-screen flex items-center justify-center w-full px-5 py-20 md:px-0 dark:bg-stone-500">
            <Paper 
                className={classNames(classes.loginContainer, `px-5 py-8 rounded-2xl w-full md:px-6 dark:bg-stone-900`)}
                component="form"
                elavation={0}
                onSubmit={submitHandler}>
                <fieldset>
                    { legendMemo }
                    { firstNameMemo }
                    { lastNameMemo }
                    { usernameMemo }
                    { userTypeMemo }
                    { passwordMemo }
                    { confirmPasswordMemo }
                    <div 
                        className={classNames("flex flex-col sm:items-center mt-6")}>
                        { signInMemo }
                        <Button disabled={hasErrors}>Submit</Button>
                    </div>
                </fieldset>
            </Paper>
        </div>
    );
};

const Container = () => (
    <SignUpContainer>
        <SignUpContent />
    </SignUpContainer>
);

export default Container;