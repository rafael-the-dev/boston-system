import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button, Checkbox, FormControlLabel, MenuItem, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Input from "src/components/default-input";
import classNames from "classnames";
import moment from "moment";
import { useRouter } from "next/router";
import currency from "currency.js";

import classes from "./styles.module.css";

import { getTotalPrice } from "src/helpers/price";

import Validation from "src/models/Validation";

import Link from "src/components/link";
import SellPrice from "src/components/register-product-page/sell-price"

/**
 *  w12 === w-1/2
 *  w13 === w-1/3
*/

export const getServerSideProps = async ({ params }) => {
     
    return {
      props: {
      }, // will be passed to the page component as props
    }
}

const Container = () => {
    const [ available, setAvailable ] = useState(true);
    const [ barCode, setBarCode ] = useState({ errors: [], value: "" })
    const [ category, setCategory ] = useState(null);
    const [ categories, setCategories ] = useState([]);
    const [ date, setDate ] = useState({ errors: [], value: null });
    const [ name, setName ] = useState({ errors: [], value: "" });
    const [ purchasePrice, setPurchasePrice ] = useState({ errors: [], value: "" });
    const [ purchaseVat, setPurchaseVat ] = useState({ errors: [], value: "" });
    const [ sellPrice, setSellPrice ] = useState({ errors: [], price: "" });
    const [ sellVat, setSellVat ] = useState({ errors: [], value: "" });

    const [ loading, setLoading ] = useState(false);
    const { query: { id, role } } = useRouter();

    const availableRef = useRef(false);
    const barCodeRef = useRef("");
    const categoryRef = useRef("");
    const dateRef = useRef("");
    const nameRef = useRef("");
    const purchasePriceRef = useRef(0);
    const purchaseVatRef = useRef(0);
    const sellPriceRef = useRef(0);
    const sellVatRef = useRef(0)

    const submitHandler = useCallback((e) => {
        e.preventDefault();

        setLoading(true);

        const options = {
            body: JSON.stringify({
                available,
                barCode: barCode.value,
                category,
                date: moment(date).toDate().toISOString().slice(0, 19).replace('T', ' '),
                name: name.value,
                purchasePrice: purchasePrice.value,
                purchaseVat: purchaseVat.value,
                sellPrice: sellPrice.value,
                sellVat: sellVat.value 
            }),
            method: Boolean(id) && role === "edit" ? "PUT" : "POST"
        };

        fetch(`/api/products${ Boolean(id) && role ? `/${id}` : "" }`, options)
            .then(res => {
                e.target.reset();
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, [ available, barCode, category, date, id, name, purchasePrice, purchaseVat, sellPrice, sellVat, role ]);

    const legendMemo = useMemo(() => (
        <Typography
            component="legend"
            className="bg-blue-500 capitalize px-5 py-6 text-center text-xl text-white w-full xl:py-8 xl:text-2xl">
            Cadastro de produto
        </Typography>
    ), []);

    const nameChangeHandler = useCallback(e => {
        const value = e.target.value;
        const errors = [];

        Validation.checkLength({ min: 2, onError: (error) => errors.push(error), value: value.trim() });

        nameRef.current = value;
        setName({
            errors,
            value
        })
    }, [])

    const nameMemo = useMemo(() => (
        <Input 
            className={classNames(classes.input, classes.w12)}
            label="Nome"
            onChange={nameChangeHandler}
            required
            value={name.value}
            variant="outlined"
        />
    ), [ name, nameChangeHandler ]);

    const categoryChangeHandler = useCallback(e => {
        const { value } = e.target;
        categoryRef.current = value;
        setCategory(value);
    }, [])

    const categoriesMemo = useMemo(() => {
        return (
            <Input
                className={classNames(classes.input, classes.w12)}
                label="Categoria"
                onChange={categoryChangeHandler}
                value={category}
                select>
                {
                    categories.map((item) => (
                        <MenuItem
                            key={item.idGrupo}
                            value={item.idGrupo}>
                            { item.Descricao }
                        </MenuItem>
                    ))
                }
            </Input>
        );
    }, [ category, categories, categoryChangeHandler ]);

    const barCodeChangeHandler = useCallback((e) => {
        const value = e.target.value.trim();

        barCodeRef.current = value;

        setBarCode({
            errors: [],
            value
        })
    }, []);

    const totalPurchasePrice = useMemo(() => {
        return getTotalPrice({ price: purchasePrice.value, taxRate: purchaseVat.value })
    }, [ purchasePrice, purchaseVat ])

    const totalSellPrice = useMemo(() => {
        return getTotalPrice({ price: sellPrice.value, taxRate: sellVat.value })
    }, [ sellVat, sellPrice ]);

    const barCodeMemo = useMemo(() => (
        <Input 
            className={classNames(classes.input, classes.w12)}
            label="Codigo de barra"
            onChange={barCodeChangeHandler}
            required
            value={barCode.value}
            variant="outlined"
        />
    ), [ barCode, barCodeChangeHandler ]);

    const dateChangeHandler = useCallback((value) => {
        dateRef.current = value;
        setDate(value)
    }, []);

    const datePickerMemo = useMemo(() => (
        <DatePicker
            label="Date"
            required
            value={date}
            onChange={dateChangeHandler}
            renderInput={(params) => <Input {...params} className={classNames(classes.input, classes.w12)} />}
        />
    ), [ date, dateChangeHandler ]);

    const sellPriceChangeHandler = useCallback(e => {
        const errors = [];
        const { value } = e.target;

        setSellPrice({
            errors, 
            value
        })
    }, [])

    const sellPriceMemo = useMemo(() => (
        <SellPrice
            sellPrice={sellPrice}
            setSellPrice={setSellPrice}
            sellVat={sellVat}
            sellVatRef={sellVatRef}
            setSellVat={setSellVat}
            />
    ), [ sellPrice, sellVat ]);



    const purchasePriceChangeHandler = useCallback(e => {
        const { value } = e.target;
        const errors = [];

        purchasePriceRef.current = value;

        setPurchasePrice({
            errors,
            value
        })
    }, [])

    const purchasePriceMemo = useMemo(() => (
        <Input 
            className={classNames(classes.input, classes.w13)}
            label="Preco de compra"
            onChange={purchasePriceChangeHandler}
            required
            value={purchasePrice.value}
            variant="outlined"
        />
    ), [ purchasePrice, purchasePriceChangeHandler ]);

    const sellVatChangeHandler = useCallback(e => {
        const errors = [];
        const { value } = e.target;

        sellVatRef.current = value;

        setSellVat({
            errors,
            value
        })
    }, [])

    const sellVatMemo = useMemo(() => (
        <Input 
            className={classNames(classes.input, classes.w13)}
            label="Iva de venda"
            onChange={sellVatChangeHandler}
            required
            value={sellVat.value}
            variant="outlined"
        />
    ), [ sellVat, sellVatChangeHandler ]);

    const totalSellPriceMemo = useMemo(() => (
        <Input 
            className={classNames(classes.input, classes.w13)}
            inputProps={{ readOnly: true }}
            label="Total sell price"
            required
            value={totalSellPrice}
            variant="outlined"
        />
    ), [ totalSellPrice ]);

    const purchaseVatChangeHandler = useCallback(e => {
        const errors = [];
        const { value } = e.target;

        purchaseVatRef.current = value;

        setPurchaseVat({
            errors,
            value
        })
    }, [])

    const purchaseVatMemo = useMemo(() => (
        <Input 
            className={classNames(classes.input, classes.w13)}
            label="Iva de compra"
            onChange={purchaseVatChangeHandler}
            required
            value={purchaseVat.value}
            variant="outlined"
        />
    ), [ purchaseVatChangeHandler, purchaseVat ]);

    const totalPurchasePriceMemo = useMemo(() => (
        <Input 
            className={classNames(classes.input, classes.w13)}
            inputProps={{ readOnly: true }}
            label="Total purchase price"
            required
            value={totalPurchasePrice}
            variant="outlined"
        />
    ), [ totalPurchasePrice ]);

    const availabilityChangeHandler = useCallback(e => {
        const { checked } = e.target;

        availableRef.current = checked;
        setAvailable(checked);
    }, [])

    const availabilityMemo = useMemo(() => (
        <FormControlLabel 
            control={<Checkbox checked={available} onChange={availabilityChangeHandler} />} 
            label="Disponivel" 
        />
    ), [ available, availabilityChangeHandler ]);

    const cancelButton = useMemo(() => (
        <Link 
            className="mr-3"
            href="/">
            <Button 
                className={classNames("border-red-500 text-red-500 sm:py-2 hover:bg-red-500 hover:border-red-500 hover:text-white")}
                type="button"
                variant="outlined">
                Cancelar
            </Button>
        </Link>
    ), [])

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(console.error)
    }, []);

    useEffect(() => {
        console.log(id, role)
        if(id && role === "edit") {
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    const product = data[0];

                    setAvailable(Boolean(product.Estado));
                    setBarCode({ errors: [], value: product.BarCod })
                    setCategory(product.fk_grupo);
                    setDate({ errors: [], value: product.Data });
                    setName({ errors: [], value: product.Nome });
                    setPurchasePrice({ errors: [], value: product.Preco_compra });
                    setPurchaseVat({ errors: [], value: product.IVA_compra });
                    setSellVat({ errors: [], value: product.Iva_venda });
                    setSellPrice({ errors: [], value: product.Preco_venda });
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                })
        }
    }, [ id, role ])

    return (
        <main className={classes.main}>
            <form 
                className="flex flex-col h-full items-stretch justify-between pb-8"
                onSubmit={submitHandler}>
                <fieldset className="grow">
                    { legendMemo }
                    <div className="px-5 py-6 xl:py-8">
                        <div className="flex flex-wrap justify-between w-full">
                            { nameMemo }
                            { categoriesMemo }
                        </div>
                        <div className="flex flex-wrap justify-between w-full">
                            { barCodeMemo }
                            { datePickerMemo }
                        </div>
                        <div className="flex flex-wrap justify-between w-full">
                            { purchasePriceMemo }
                            { purchaseVatMemo }
                            { totalPurchasePriceMemo }
                            { sellPriceMemo }
                        </div>
                        <div>
                            { availabilityMemo }
                        </div>
                    </div>
                </fieldset>
                <div className="flex justify-end px-5">
                    { cancelButton }
                    { !Boolean(id) && role !== "edit" && <Button
                            className={classNames("bg-blue-800 text-white hover:bg-blue-500 sm:py-2")}
                            type="submit"
                            variant="contained">
                            { loading ? "Loading..." : "Submeter" }
                        </Button>
                    }
                    { Boolean(id) && role === "edit" && <Button
                            className={classNames("bg-blue-800 text-white hover:bg-blue-500 sm:py-2")}
                            type="submit"
                            variant="contained">
                            { loading ? "Loading..." : "Atualizar" }
                        </Button>
                    }
                </div>
            </form>
        </main>
    );
};

export default Container;