import MenuItem from "@mui/material/MenuItem";
import classNames from "classnames"

import Input from "src/components/default-input";

const Container = ({ categories, className, value, setValue }) => {
    const categoryChangeHandler = e => setValue(e.target.value);

    return (
        <Input
            className={classNames(className)}
            label="Categoria"
            onChange={categoryChangeHandler}
            value={value}
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
};

export default Container;