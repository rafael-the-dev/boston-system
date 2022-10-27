import { useCallback, useRef, useMemo, useState } from "react"
import { Button, TableCell, Typography } from "@mui/material";
import classNames from "classnames";
import { v4 as uuidV4 } from "uuid"

import classes from "./styles.module.css";

import { getCategories, getProducts } from "src/helpers/queries"

import { CategoriesCombobox } from "src/components/products-page"
import Input from "src/components/default-input";
import Link from "src/components/link"
import Table from "src/components/table";
import TableBodyRow from "src/components/products-page/table-row" 

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
    )}, [ productsList ])

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
                <div className="flex justify-end px-5">
                    <Link href="register-product">
                        <Button
                            className="border-blue-500 text-blue-500 md:py-3 hover:bg-blue-500 hover:text-white"
                            variant="outlined">
                            Add new product
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Container;