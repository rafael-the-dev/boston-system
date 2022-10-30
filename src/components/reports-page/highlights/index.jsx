import classNames from "classnames";

import classes from "./styles.module.css"

import Highlight from "../highlight";

const HightlightsContainer = ({ total, totalAmount, totalVAT }) => {

    return (
        <div className={classNames(classes.hightlightsContainer, "flex flex-wrap items-stretch justify-between")}>
            <Highlight color="rgb(146 199 227 / 71%)" description={total} title="Total" />
            <Highlight color="#e2e8f0" description={totalAmount} title="Subtotal" />
            <Highlight color="#e5e5e5" description={totalVAT} title="Total VAT" />
        </div>
    );
};

export default HightlightsContainer;