import { useCallback, useEffect, useRef, useMemo, useState } from "react"
import { Button, TableCell, Typography } from "@mui/material";
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid";
import * as cookie from "cookie";

import classes from "./styles.module.css";

import { getCategories, getProducts } from "src/helpers/queries"

import { CategoriesCombobox } from "src/components/products-page"
import Input from "src/components/default-input";
import Link from "src/components/link";
import NewCategoryDialog from "src/components/products-page/new-category-dialog";
import Table from "src/components/table";
import TableBodyRow from "src/components/products-page/table-row" 

export const getServerSideProps = async ({ req: { headers }, res }) => {
    const { token } = cookie.parse(headers.cookie);

    const options = {
        headers: {
            Authorization: token
        }
    };

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    let [ categories, products ] = [[], []];

    try {
        [ categories, products ] = await Promise.all([ getCategories({ options }), getProducts({ options }) ]);
    } catch(e) {

    }  

    return {
      props: {
        categories, 
        products
      }, // will be passed to the page component as props
    }
}

const Container = ({ categories, products }) => {
    const [ categoriesList, setCategoriesList ] = useState([]);
    const [ category, setCategory ] = useState(-1);
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
    }, [ category, products ]);

    const categoryDialog = useMemo(() => <NewCategoryDialog setCategories={setCategoriesList} />, []);

    const registerProductLinkMemo = useMemo(() => (
        <Link href="register-product">
            <Button
                className="border-blue-500 py-2 text-blue-500 w-full md:py-3 hover:bg-blue-500 hover:text-white"
                variant="outlined">
                Add new product
            </Button>
        </Link>
    ), [])

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
    ), [ changeHandler, value ]);

    const categoriesMemo = useMemo(() => {
        return ( 
            <CategoriesCombobox 
                className={classNames(classes.categories)} 
                categories={categoriesList}
                value={category} 
                setValue={setCategory} 
            />
        )
            
    }, [ category, categoriesList, setCategory ]);

    const getBodyRows = useCallback(({ page, rowsPerPage }) => {
        const list = rowsPerPage > 0 ? productsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : productsList;

        return (
            <>
                {
                    list.map(row => (
                        <TableBodyRow { ...row } key={uuidV4()}>
                            {
                                headers.current.map(header => (
                                    <TableCell 
                                        align="center"
                                        key={uuidV4()}>
                                        { row[header.key] }
                                    </TableCell>
                                ))
                            }
                        </TableBodyRow>
                    ))
                }
            </>
    )}, [ productsList ]);

    useEffect(() => {
        setCategoriesList(categories)
    }, [ categories ])

    return (
        <main>
            <div className={classNames(classes.container, "flex flex-col h-full items-stretch justify-between pb-8")}>
                <div>
                    { title }
                    <div className="flex flex-wrap justify-between px-5 py-6">
                        { searchMemo }
                        { categoriesMemo }
                    </div>
                    <div className="px-5">
                        <Table 
                            data={productsList} 
                            getBodyRows={getBodyRows}
                            headers={headers} 
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-end mt-6 px-5 sm:flex-row">
                    { categoryDialog }
                    { registerProductLinkMemo }
                </div>
            </div>
        </main>
    );
};

export default Container;