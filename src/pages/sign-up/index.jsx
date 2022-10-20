import { Alert, AlertTitle, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import classNames from 'classnames'
import classes from "./styles.module.css"

import { Button, Input } from "src/components/signup-page"

const Container = () => {
    const [ values, setValues ] = useState({
        password: '',
        showPassword: false,
    });
    
    const alertRef = useRef(null);
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
                        placeholder="Full name"
                        ref={userNameRef}
                    />
                    <Input 
                        placeholder="Username"
                        ref={userNameRef}
                    />
                    <Input 
                        placeholder="Password"
                        ref={userNameRef}
                    />
                    <Input 
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
                        <Button>Submit</Button>
                    </div>
                </fieldset>
            </Paper>
        </div>
    );
};

export default Container;