import { Button, Typography } from "@mui/material"
import classNames from "classnames";

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import classes from "./styles.module.css"

import { Highlight } from "src/components/reports-page"

const Container = () => {

    return (
        <main className={classNames(classes.main, `bg-stone-100 grow`)}>
            <div className="flex flex-wrap justify-between py-8 px-5">
                <div className={classNames(classes.hightlightsContainer, "flex flex-wrap items-stretch justify-between")}>
                    <Highlight color="#fecaca" description="470.5MT" title="Total" />
                    <Highlight color="#fde68a" description="470.5MT" title="Subtotal" />
                    <Highlight color="#e9d5ff" description="470.5MT" title="Total VAT" />
                </div>
                <Button
                    className={classNames(classes.filtersButton, "bg-white rounded-xl text-black hover:bg-stone-400")}
                    startIcon={<FilterAltIcon />}>
                    Filtros
                </Button>
            </div>
        </main>
    );
};

export default Container;