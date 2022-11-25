import { useCallback, useEffect, useRef, useMemo, useState } from "react"
import { Button, TableCell, Typography } from "@mui/material";
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid";

import classes from "./styles.module.css";

import { CategoriesCombobox } from "src/components/products-page"
import Content from "src/components/scroll-container";
import Input from "src/components/default-input";
import Link from "src/components/link";
import Main from "src/components/main";
import NewCategoryDialog from "src/components/products-page/new-category-dialog";
import Panel from "src/components/panel";
import Table from "src/components/table";
import TableBodyRow from "src/components/products-page/table-row" 

//server side render products and products
export { getProductsAndCategories as getStaticProps } from "src/helpers/server-side";

const Container = ({ categories, productsList }) => {
    const [ categoriesList, setCategoriesList ] = useState([]);
    const [ category, setCategory ] = useState(-1);
    const [ value, setValue ] = useState("");
    
    const headers = useRef([
        { key: "Nome", label: "Name" },
        { key: "BarCod", label: "Barcode" },
        { key: "Preco_compra", label: "Purchase price" },
        { key: "IVA_compra", label: "Purchase VAT" },
        { key: "Preco_venda", label: "Sell price" },
        { key: "Iva_venda", label: "Sell VAT" },
        { key: "Profit", label: "Profit" }
    ]);

    const products = useMemo(() => {
        let list = productsList;

        if(category && category !== -1) {
            list = list.filter(item => item.fk_grupo === category);
        }

        return list;
    }, [ category, productsList ]);

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

    const title = useMemo(() => <Panel title="Products" />, []);

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
        const list = rowsPerPage > 0 ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : products;

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
    )}, [ products ]);

    useEffect(() => {
        setCategoriesList(categories)
    }, [ categories ])

    return (
        <Main>
            { title }
            <Content>
                <div>
                    <div className="flex flex-wrap justify-between">
                        { searchMemo }
                        { categoriesMemo }
                    </div>
                    <div>
                        <Table 
                            data={products} 
                            getBodyRows={getBodyRows}
                            headers={headers} 
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-end mt-6 sm:flex-row">
                    { categoryDialog }
                    { registerProductLinkMemo }
                </div>
            </Content>
        </Main>
    );
};

export default Container;