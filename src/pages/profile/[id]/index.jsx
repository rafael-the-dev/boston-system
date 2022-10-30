import { Button, MenuItem, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from "next/router";
import * as cookie from "cookie";

import classNames from 'classnames'
import classes from "./styles.module.css";

import SaveIcon from '@mui/icons-material/Save';

import Validation from "src/models/Validation";
import { fetchHelper } from "src/helpers/queries"
import { SignUpContext } from "src/context";

import DefaultInput from "src/components/default-input";
import Input from "src/components/default-input"
import Link from "src/components/link";
import MessageDialog from "src/components/message-dialog";
import Panel from "src/components/panel";

export const getServerSideProps = async ({ params, req: { headers } }) => {
    const { id } = params;
    
    const { token } = cookie.parse(headers.cookie);

    const options = {
        headers: {
            Authorization: token
        }
    };

    let user = {};

    try {
        const users = await fetchHelper({ options, url: `${process.env.SERVER}/api/users/${id}` });
        user = users[0];
    } catch(e) {

    }
    
    return {
        props: {
            profile: user
        }
    }
};

const Container = ({ profile }) => {
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

     const [ message, setMessage ] = useState({ description: "", title: "", type: "" })

    const { query: { id } } = useRouter();

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
    const onOpen = useRef(null);
    const userNameRef = useRef(null);

    const changeHandler = useCallback((e) => setUser(e.target.value), [])

    const legendMemo = useMemo(() => (
        <Panel title="Perfil" />
    ), []);

    const messageDialog = useMemo(() => (
        <MessageDialog 
            description={ message.description }
            onOpen={onOpen}
            title={ message.title }
            type={ message.type }
        />
    ), [ message ])

    const firstNameMemo = useMemo(() => (
        <Input 
            className="input w12"
            errors={firstName.error}
            id="name"
            onChange={e => firstNameChangeHandler(e.target.value)}
            placeholder="Primeiro nome"
            inputRef={firstNameRef}
            value={firstName.value}
        />
    ), [ firstName, firstNameChangeHandler ])

    const lastNameMemo = useMemo(() => (
        <Input 
            className="input w12"
            errors={lastName.error}
            id="name"
            label="Apelido"
            onChange={e => lastNameChangeHandler(e.target.value)}
            placeholder="Ultimo nome"
            inputRef={lastNameRef}
            value={lastName.value}
            variant="outlined"
        />
    ), [ lastName, lastNameChangeHandler ])

    const usernameMemo = useMemo(() => (
        <Input 
            className="input w12"
            errors={username.error}
            id="username"
            onChange={e => usernameChangeHandler(e.target.value)}
            placeholder="Nome do usuario"
            inputRef={userNameRef}
            value={username.value}
        />
    ), [ username, usernameChangeHandler ]);

    const userTypeMemo = useMemo(() => (
        <DefaultInput 
            classes={{ root: "input w12" }}
            className="input w12"
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

    const submitHandler = useCallback(async e => {
        e.preventDefault();

        try {
            await onSubmit({
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                username: userNameRef.current.value
            })
            setMessage({ description: "Dados atualizados com successo", type: "success" });
            onOpen.current?.();
        } catch(e) {
            setMessage({ description: "Erro ao atualizar os dados", title: "Error", type: "error" });
            onOpen.current?.();
        }
    }, [ onSubmit ]);

    useEffect(() => {
        if(Boolean(profile)) {
            setFirstName({ error: [], value: profile.Nome });
            setLastName({ error: [], value: profile.Apelido });
            setUser(profile.Categoria);
            setUserName({ error: [], value: profile.Username })
        }
    }, [ profile ])

    return (
        <div className="">
            { messageDialog }
            <form 
                className={classNames(classes.form, ``)}
                onSubmit={submitHandler}>
                <fieldset className="flex flex-col h-full items-stretch justify-between">
                    <div>
                        { legendMemo }
                        <div className="flex flex-wrap justify-between pt-6 px-5">
                            { firstNameMemo }
                            { lastNameMemo }
                        </div>
                        <div className="flex flex-wrap justify-between px-5">
                            { usernameMemo }
                            { userTypeMemo }
                        </div>
                        { !id && passwordMemo }
                        { !id && confirmPasswordMemo }
                    </div>
                    <div 
                        className={classNames("flex justify-end px-5 pb-6")}>
                        <Button 
                            className="bg-blue-700 px-6 py-3 ro text-white hover:bg-blue-500 hover:border-blue-500"
                            disabled={hasErrors}
                            startIcon={<SaveIcon />}
                            type="submit">
                            { loading ? "Loading..." : "Atualizar" }
                        </Button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Container;