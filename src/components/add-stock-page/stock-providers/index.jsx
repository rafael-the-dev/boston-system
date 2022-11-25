import * as React from "react";
import MenuItem from "@mui/material/MenuItem";

import { AddStockContext } from "src/context";

import { fetchHelper } from "src/helpers/queries";

import TextField from "src/components/default-input";

const StockProviders = () => {
    const { addStockProvider, stockProvider } = React.useContext(AddStockContext);

    const [ list, setList ] = React.useState([]);

    const fetchData = React.useCallback(async () => {
        try {
            const options = {
                headers: {
                    "Authorization": JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token
                }
            };

            const data = await fetchHelper({ url: "/api/stock-providers", options });
            setList(data)
        } catch(e) {

        }
    }, [])

    React.useEffect(() => {
        fetchData();
    }, [ fetchData ]);

    const changeHandler = React.useCallback(e => addStockProvider(e.target.value), [])

    return (
        <TextField
            className="input w12"
            label="Selecione o fornecedor"
            value={stockProvider}
            select>
            {
                list.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                        { item.name }
                    </MenuItem>
                ))
            }
        </TextField>
    );
};

export default StockProviders;