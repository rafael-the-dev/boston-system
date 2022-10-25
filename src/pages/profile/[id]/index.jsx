import { Alert, AlertTitle, MenuItem, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from "next/router"

import classNames from 'classnames'
import classes from "./styles.module.css";

import Validation from "src/models/Validation";
import { SignUpContext, SignUpContextProvider } from "src/context"

import { Button } from "src/components/signup-page";
import DefaultInput from "src/components/default-input";
import Input from "src/components/default-input"
import Link from "src/components/link";
import Panel from "src/components/panel"

const SignUpContainer = ({ children }) => (
    <SignUpContextProvider>
        { children }
    </SignUpContextProvider>
);

const SignUpContent = () => {
    const { 
        confirmPassword, confirmPasswordChangeHandler,
        firstName, firstNameChangeHandler,
        hasErrors,
        lastName, lastNameChangeHandler, loading,
        onSubmit, 
        password, passwordChangeHandler,
        setFirstName, setLastName, setUser, setUserName,
        user, username, usernameChangeHandler
     } = useContext(SignUpContext);

     const { query: { id } } = useRouter()

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
        <Panel title="Perfil" />
    ), []);

    const firstNameMemo = useMemo(() => (
        <Input 
            className="input w12"
            errors={firstName.error}
            id="name"
            onChange={firstNameChangeHandler}
            placeholder="Primeiro nome"
            ref={firstNameRef}
            value={firstName.value}
        />
    ), [ firstName, firstNameChangeHandler ])

    const lastNameMemo = useMemo(() => (
        <Input 
            className="input w12"
            errors={lastName.error}
            id="name"
            label="Apelido"
            onChange={lastNameChangeHandler}
            placeholder="Ultimo nome"
            ref={lastNameRef}
            value={lastName.value}
            variant="outlined"
        />
    ), [ lastName, lastNameChangeHandler ])

    const usernameMemo = useMemo(() => (
        <Input 
            className="input w12"
            errors={username.error}
            id="username"
            onChange={usernameChangeHandler}
            placeholder="Nome do usuario"
            ref={userNameRef}
            value={username.value}
        />
    ), [ username, usernameChangeHandler ]);

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
    }, [ onSubmit ]);

    useEffect(() => {
        if(Boolean(id)) {
            fetch(`/api/users/${id}`)
                .then(res => res.json())
                .then(res => {
                    const data = res[0];
                    
                    setFirstName({ error: [], value: data.Nome });
                    setLastName({ error: [], value: data.Apelido });
                    setUser(data.Categoria);
                    setUserName({ error: [], value: data.Username })
                })
                .catch(console.error)
        }
    }, [ id ])

    return (
        <div className="">
            <form 
                className={classNames(classes.loginContainer, ``)}
                onSubmit={submitHandler}>
                <fieldset>
                    { legendMemo }
                    <div className="flex flex-wrap justify-between">
                        { firstNameMemo }
                        { lastNameMemo }
                    </div>
                    { usernameMemo }
                    { userTypeMemo }
                    { !id && passwordMemo }
                    { !id && confirmPasswordMemo }
                    <div 
                        className={classNames("flex flex-col sm:items-center mt-6")}>
                        <Button disabled={hasErrors}>
                            { loading ? "Loading..." : "Atualizar" }
                        </Button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

const Container = () => (
    <SignUpContainer>
        <SignUpContent />
    </SignUpContainer>
);

export default Container;