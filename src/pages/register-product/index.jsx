import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button, MenuItem, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Input from "src/components/default-input";
import classNames from "classnames";
import moment from "moment";
import { useRouter } from "next/router";
import currency from "currency.js";

import classes from "./styles.module.css";

import { getTotalPrice } from "src/helpers/price";

import Validation from "src/models/Validation";

import Checkbox from "src/components/checkbox";
import Link from "src/components/link";
import PurchasePrice from "src/components/register-product-page/purchase-price"
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
    const hasDataChanged = useRef(false);
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
            label="Expiry date"
            required
            value={date}
            onChange={dateChangeHandler}
            renderInput={(params) => <Input {...params} className={classNames(classes.input, classes.w12)} />}
        />
    ), [ date, dateChangeHandler ]);
    
    const purchasePriceMemo = useMemo(() => (
        <PurchasePrice
            hasDataChanged={hasDataChanged}
            id={id}
            purchasePrice={purchasePrice}
            purchasePriceRef={purchasePriceRef}
            setPurchasePrice={setPurchasePrice}
            purchaseVat={purchaseVat}
            purchaseVatRef={purchaseVatRef}
            setPurchaseVat={setPurchaseVat}
        />
    ), [ id, purchasePrice, purchaseVat ]);

    const sellPriceMemo = useMemo(() => (
        <SellPrice
        hasDataChanged={hasDataChanged}
            id={id}
            sellPrice={sellPrice}
            setSellPrice={setSellPrice}
            sellVat={sellVat}
            sellVatRef={sellVatRef}
            setSellVat={setSellVat}
            />
    ), [ id, sellPrice, sellVat ]);

    const availabilityChangeHandler = useCallback(e => {
        const { checked } = e.target;

        availableRef.current = checked;
        setAvailable(checked);
    }, [])

    const availabilityMemo = useMemo(() => (
        <Checkbox 
            checked={available}  
            label="Disponivel" 
            onChange={availabilityChangeHandler}
        />
    ), [ available, availabilityChangeHandler ]);

    const cancelButton = useMemo(() => (
        <Link 
            className="mr-3"
            href="/products">
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
        
        if(id && role === "edit") {
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    const product = data[0];

                    hasDataChanged.current = true;

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