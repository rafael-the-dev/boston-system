import * as React from "react";
import classNames from "classnames";

import { SalesContext, SalesTabContext } from "src/context"

import Home from "./components/home";
import SelectedSale from "./components/selected-sale"

const TabContainer = ({ tabId }) => {
    const { currentTab } = React.useContext(SalesContext)
    const { selectedSale } = React.useContext(SalesTabContext);

    const homeMemo = React.useMemo(() => <Home />, []);
    const selectedSaleMemo = React.useMemo(() => <SelectedSale />, [])
    
    return (
        <div className={classNames("pb-12", { "hidden": currentTab !== tabId })}>
            {
                Object.keys(selectedSale).length > 0 ? selectedSaleMemo : homeMemo
            }
        </div>
    );
};

export default TabContainer;