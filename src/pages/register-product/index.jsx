import { useCallback, useMemo, useState } from "react"
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Input from "src/components/default-input";
import classNames from "classnames";

import classes from "./styles.module.css";

/**
 *  w12 === w-1/2
 *  w13 === w-1/3
*/

const Container = () => {
    const [ date, setDate ] = useState(null);

    const dateChangeHandler = useCallback((value) => {
        setDate(value)
    }, [])

    return (
        <main className={classes.main}>
            <form className="flex flex-col h-full items-stretch justify-between pb-8">
                <fieldset className="grow">
                    <Typography
                        component="legend"
                        className="bg-blue-500 capitalize px-5 py-6 text-center text-xl text-white w-full xl:py-8 xl:text-2xl">
                        Cadastro de produto
                    </Typography>
                    <div className="px-5 py-6 xl:py-8">
                        <Input 
                            className={classNames(classes.input)}
                            label="Nome"
                            variant="outlined"
                        />
                        <div className="flex flex-wrap justify-between w-full">
                            <Input 
                                className={classNames(classes.input, classes.w12)}
                                label="Codigo de barra"
                                variant="outlined"
                            />
                            <DatePicker
                                label="Date"
                                value={date}
                                onChange={dateChangeHandler}
                                renderInput={(params) => <Input {...params} className={classNames(classes.input, classes.w12)} />}
                            />
                        </div>
                        <div className="flex flex-wrap justify-between w-full">
                            <Input 
                                className={classNames(classes.input, classes.w13)}
                                label="Preco de venda"
                                variant="outlined"
                            />
                            <Input 
                                className={classNames(classes.input, classes.w13)}
                                label="Preco de compra"
                                variant="outlined"
                            />
                            <Input 
                                className={classNames(classes.input, classes.w13)}
                                label="Iva de venda"
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <FormControlLabel 
                                control={<Checkbox defaultChecked />} 
                                label="Disponivel" 
                            />
                        </div>
                    </div>
                </fieldset>
                <div className="flex justify-end px-5">
                    <Button 
                        className={classNames("border-red-500 mr-3 text-red-500 sm:py-2 hover:bg-red-500 hover:border-red-500 hover:text-white")}
                        type="button"
                        variant="outlined">
                        Cancelar
                    </Button>
                    <Button
                        className={classNames("bg-blue-800 text-white hover:bg-blue-500 sm:py-2")}
                        variant="contained"
                        >
                        Submeter
                    </Button>
                </div>
            </form>
        </main>
    );
};

export default Container;