import { Alert, AlertTitle, IconButton, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import classNames from 'classnames'
import classes from "./styles.module.css";

import { Button } from "src/components/signup-page"
import Input from 'src/components/Input';


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
                    Login
                </Typography>
                <Alert className={classNames("hidden mb-4")} ref={alertRef} severity="error">
                    <AlertTitle>Error</AlertTitle>
                   Username or password invalid!
                </Alert>
                <fieldset>
                    <div className={classNames(`border border-solid border-blue-600 flex items-center mt-4 px-3 rounded-lg dark:bg-stone-400`)}>
                        <AccountCircle className="text-slate-700" />
                        <Input 
                            className="grow"
                            placeholder="Username"
                            ref={userNameRef}
                            required
                        />
                    </div>
                    <div className={classNames(`border border-solid border-blue-600 flex items-center mt-4 px-3 rounded-lg dark:bg-stone-400`)}>
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
                            placeholder="password"
                            required
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                        />
                    </div>
                    <div 
                        className={classNames("flex flex-col sm:items-center mt-6")}>
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
                        <Button >Submit</Button>
                    </div>
                </fieldset>
            </Paper>
        </div>
    );
};

export default Container;