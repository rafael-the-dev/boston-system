import { Alert, AlertTitle, Paper, Typography } from '@mui/material';
import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

import classNames from 'classnames'
import classes from "./styles.module.css"

import { Button, Input } from "src/components/signup-page"

const Container = () => {
    const [ errors, setErrors ] = useState({
        'confirm-password': [],
        name: [],
        password: [],
        username: []
    })
    
    const alertRef = useRef(null);
    const userNameRef = useRef(null);

    const hasErrors = useMemo(() => {
        return Boolean(Object.values(errors).reduce((previousValue, currentValue) => {
            return previousValue + currentValue.length;
        }, 0))
    }, [ errors ]);

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

    const passwordChangeHandler = useCallback(value => {
        const passwordErrors = [];

        const startWithUppercaseLetter = () => {
            const isValid = /^[A-Z]/.test(value);

            if(!isValid) {
                passwordErrors.push({
                    message: "must start with uppercased letter",
                    name: ""
                })
            }
        };

        const hasNumbers = () => {
            const isValid = /[0-9]{2,}/g.test(value);

            if(!isValid) {
                passwordErrors.push({
                    message: "must contain at least two numbers",
                    name: ""
                })
            }
        };

        const hasWhitespace = () => {
            const isValid = /\s+/g.test(value);
            
            if(isValid) {
                passwordErrors.push({
                    message: "must not contain white space",
                    name: ""
                })
            }
        };

        const checkLength = () => {
            if(value.length < 8) {
                passwordErrors.push({
                    message: "must contain at least 8 characters",
                    name: ""
                })
            }
        };

        startWithUppercaseLetter();
        hasNumbers();
        hasWhitespace();
        checkLength();

        setErrors(currentErrors => ({
            ...currentErrors,
            'password': passwordErrors
        }))
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center w-full px-5 md:px-0 dark:bg-stone-500">
            <Paper 
                className={classNames(classes.loginContainer, `px-5 py-8 rounded-2xl w-full md:px-6 dark:bg-stone-900`)}
                component="form"
                elavation={0}>
                <Typography className="font-bold mb-8 text-center text-2xl uppercase  dark:text-slate-300">
                    Sign up
                </Typography>
                <Alert className={classNames("hidden mb-4")} ref={alertRef} severity="error">
                    <AlertTitle>Error</AlertTitle>
                   Username or password invalid!
                </Alert>
                <fieldset>
                    <Input 
                        errors={errors}
                        id="name"
                        placeholder="Full name"
                        ref={userNameRef}
                    />
                    <Input 
                        errors={errors}
                        id="username"
                        placeholder="Username"
                        ref={userNameRef}
                    />
                    <Input 
                        errors={errors}
                        id="password"
                        onChange={passwordChangeHandler}
                        placeholder="Password"
                        ref={userNameRef}
                    />
                    <Input 
                        errors={errors}
                        id="confirm-password"
                        placeholder="Comfirm password"
                        ref={userNameRef}
                    />
                    <div 
                        className={classNames("flex flex-col sm:items-center mt-6")}>
                        <Typography component="p" className="ml-4 text-sm dark:text-slate-400">
                            have an account? 
                            <Link href="/login">
                                <a 
                                    className={classNames(classes.signUpLink, 
                                    "ml-2 text-blue-700 uppercase underline hover:opacity-90")}>
                                    sign in.
                                </a>
                            </Link>
                        </Typography>
                        <Button disabled={hasErrors}>Submit</Button>
                    </div>
                </fieldset>
            </Paper>
        </div>
    );
};

export default Container;