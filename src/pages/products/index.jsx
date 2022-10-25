import { useCallback, useEffect, useRef, useMemo, useState } from "react"
import { MenuItem, Typography } from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import { CategoriesCombobox } from "src/components/products-page"
import Input from "src/components/default-input";
import Table from "src/components/table";

const getCategories = () => {
    return fetch('http://localhost:3000/api/categories')
            .then(res => res.json())
            .then(data => [ { Descricao: "Todos", idGrupo: -1 }, ...data ])
};

const getProducts = () => {
    return fetch('http://localhost:3000/api/products')
        .then(res => res.json())
}; 

export const getServerSideProps = async () => {
    const [ categories, products ] = await Promise.all([ getCategories(), getProducts() ]);
    
    return {
      props: {
        categories, 
        products
      }, // will be passed to the page component as props
    }
}

const Container = ({ categories, products }) => {
    //const [ categories, setCategories ] = useState([]);
    const [ category, setCategory ] = useState(-1);
    //const [ products, setProducts ] = useState([]);
    const [ value, setValue ] = useState("");

    const headers = useRef([
        { key: "Nome", label: "Nome" },
        { key: "BarCod", label: "Codigo de barra" },
        { key: "Preco_compra", label: "Preco de compra" },
        { key: "Preco_venda", label: "Preco de venda" },
        { key: "IVA_compra", label: "IVA de compra" },
        { key: "IVA_venda", label: "Iva de venda" },
        { key: "NoEstadome", label: "Estado" }
    ]);

    const productsList = useMemo(() => {
        let list = products;

        if(category && category !== -1) {
            list = list.filter(item => item.fk_grupo === category);
        }

        return list;
    }, [ category, products ])

    const title = useMemo(() => (
        <Typography
            component="h1"
            className="bg-blue-500 capitalize px-5 py-6 text-center text-xl text-white w-full xl:py-8 xl:text-2xl">
            Produtos
        </Typography>
    ), []);

    const changeHandler = useCallback(e => setValue(e.target.value), []);

    const searchMemo = useMemo(() => (
        <Input 
            className={classNames(classes.searchField)}
            label="Pesquisar"
            onChange={changeHandler}
            required
            value={value}
            variant="outlined"
        />
    ), [ value ]);

    const categoriesMemo = useMemo(() => {
        return ( 
            <CategoriesCombobox 
                className={classNames(classes.categories)} 
                categories={categories}
                value={category} 
                setValue={setCategory} 
            />
        )
            
    }, [ category, setCategory ]);

    return (
        <main>
            <section className="pb-8 xl:pb-12">
                { title }
                <div className="flex flex-wrap justify-between px-5 py-6 xl:px-8">
                    { searchMemo }
                    { categoriesMemo }
                </div>
                <div className="px-5 xl:px-8">
                    <Table data={productsList} headers={headers} />
                </div>
            </section>
        </main>
    );
};

export default Container;