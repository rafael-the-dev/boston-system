import { Alert, AlertTitle, IconButton, Paper, Typography } from '@mui/material';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link'

import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import classNames from 'classnames'
import classes from "./styles.module.css";

import { Button } from "src/components/signup-page"
import Input from 'src/components/Input';


const Container = () => {
    const [ loading, setLoading ] = useState(false);
    const [ values, setValues ] = useState({
        password: '',
        showPassword: false,
    });
    
    const alertRef = useRef(null);
    const passwordRef = useRef(null);
    const userNameRef = useRef(null);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = useCallback(() => {
        setValues(currentValues => ({
          ...currentValues,
          showPassword: !currentValues.showPassword
        }));
    }, []);

    const handleChange = useCallback((prop) => (event) => {
        setValues(currentValues => ({ ...currentValues, [prop]: event.target.value }));
    }, []);

    const router = useRouter();
    const submitHandler = useCallback(e => {
        e.preventDefault();

        setLoading(true);

        const options = {
            body: JSON.stringify({
                password: passwordRef.current.value,
                username: userNameRef.current.value
            }),
            method: "PUT",
        };

        fetch('/api/login', options)
            .then(() => {
                router.push("/")
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, [ router ]);

    const legendMemo = useMemo(() => (
        <Typography className="font-bold mb-8 text-center text-2xl uppercase  dark:text-slate-300">
            Login
        </Typography>
    ), []);

    const alertMemo = useMemo(() => (
        <Alert className={classNames("hidden mb-4")} ref={alertRef} severity="error">
            <AlertTitle>Error</AlertTitle>
            Username or password invalid!
        </Alert>
    ), [])

    const usernameMemo = useMemo(() => (
        <div className={classNames(`border border-solid border-blue-700 flex items-center mt-4 px-3 rounded-lg dark:bg-stone-400`)}>
            <AccountCircle className="text-slate-700" />
            <Input 
                className="grow"
                placeholder="Username"
                ref={userNameRef}
                required
            />
        </div>
    ), []);

    const passwordMemo = useMemo(() => (
        <div className={classNames(`border border-solid border-blue-700 flex items-center mt-4 px-3 rounded-lg dark:bg-stone-400`)}>
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
            >
                { values.showPassword ? <VisibilityOff className="text-slate-700" /> : <Visibility className="text-slate-700" />}
            </IconButton>
            <Input 
                className="grow"
                onChange={handleChange('password')}
                placeholder="password"
                ref={passwordRef}
                required
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
            />
        </div>
    ), [ handleClickShowPassword, handleMouseDownPassword, values ]);

    const signUpMemo = useMemo(() => (
        <Typography component="p" className="ml-4 text-sm dark:text-slate-400">
            don't you have an account? 
            <Link href="/sign-up">
                <a 
                    className={classNames(classes.signUpLink, 
                    "ml-2 text-blue-700 uppercase underline hover:opacity-90")}>
                    sign up.
                </a>
            </Link>
        </Typography>
    ), []);

    const submitButtonMemo = useMemo(() => (
        <Button >
            { loading ? "Loading..." : "Submit" }
        </Button>
    ), [ loading ])

    return (
        <div className="min-h-screen flex items-center justify-center w-full px-5 md:px-0 dark:bg-stone-500">
            <Paper 
                className={classNames(classes.loginContainer, `px-5 py-8 rounded-2xl w-full md:px-6 dark:bg-stone-900`)}
                component="form"
                elavation={0}
                onSubmit={submitHandler}>
                <fieldset>
                    { legendMemo }
                    { alertMemo }
                    { usernameMemo }
                    { passwordMemo }
                    <div 
                        className={classNames("flex flex-col sm:items-center mt-6")}>
                        { signUpMemo }
                        { submitButtonMemo }
                    </div>
                </fieldset>
            </Paper>
        </div>
    );
};

export default Container;