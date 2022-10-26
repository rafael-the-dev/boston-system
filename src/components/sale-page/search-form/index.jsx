import * as React from "react";
import { v4 as uuidV4 } from "uuid";
import { Button, Checkbox, TableCell } from "@mui/material"

import { SaleContext } from "src/context"

import { CategoriesCombobox } from "src/components/products-page"
import Input from "src/components/default-input";
import Table from "src/components/table";
import TableRow from "./components/TableRow"

const Container = ({ categories, onClose, products }) => {
    const { getCart } = React.useContext(SaleContext);

    const [ category, setCategory ] = React.useState(null);
    const [ selectedProducts, setSelectedProducts ] = React.useState([]);
    const [ value, setValue ] = React.useState("");

    const headers = React.useRef([
        { key: "Selecionado", label: "Selecionado" },
        { key: "Nome", label: "Nome" },
        { key: "Preco_venda", label: "Preco" }
    ]);

    const data = React.useMemo(() => {
        let list = products;

        if(category && category !== -1) {
            list = list.filter(item => item.fk_grupo === category);
        }

        if(value.trim() !== "") {
            return list.filter(item => item.Nome.toLowerCase().includes(value.toLowerCase()));
        }

        return list;
    }, [ category, products, value ])

    const getBodyRows = React.useCallback(({ page , rowsPerPage }) => {
        const list = rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data;

        return (
            <>
                {
                    list.map(row => (
                        <TableRow 
                            headers={headers}
                            key={uuidV4()}
                            row={row}
                            selectedProducts={selectedProducts}
                            setSelectedProducts={setSelectedProducts}
                        />
                    ))
                }
            </>
        );
    }, [ data, selectedProducts ]);

    const changeHandler = React.useCallback(e => setValue(e.target.value), []);

    const clickHandler = React.useCallback(() => {
        setSelectedProducts(list => {
            getCart().addItem(...list);
            return [];
        });
        onClose();
    }, [ getCart, onClose ])

    return (
        <div className="px-4 py-6 md:px-6">
            <form className="flex flex-wrap justify-between">
                <Input 
                    className="input w12"
                    label="Pesquisar por nome ou codigo de barra"
                    onChange={changeHandler}
                    value={value}
                />
                <CategoriesCombobox 
                    className="input w12"
                    categories={categories}
                    value={category}
                    setValue={setCategory}
                />
            </form>
            <div>
                <Table 
                    data={products}
                    getBodyRows={getBodyRows}
                    headers={headers}
                />
            </div>
            {
                selectedProducts.length > 0 && (
                    <div className="flex justify-end mt-8">
                        <Button
                            className="bg-blue-500 py-3 text-white hover:bg-blue-500 hover:opacity-80"
                            onClick={clickHandler}
                            variant="contained">
                            Adicionar { selectedProducts.length } produto{ selectedProducts.length > 1 && "s"}
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default Container;