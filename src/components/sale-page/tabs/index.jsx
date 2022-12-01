import * as React from "react"
import IconButton from "@mui/material/IconButton";

import AddIcon from '@mui/icons-material/Add';

import { SaleTabsContext } from "src/context";

import Tab from "./components/tab";

const SalesPageTabs = () => {
    const { addTab, getTabs } = React.useContext(SaleTabsContext);

    return (
        <ul className="flex">
            {
                getTabs().list.map((tab, index) => (
                    <Tab 
                        id={tab.id}
                        index={index + 1}
                        key={tab.id}
                    />
                ))
            }
            <li>
                <IconButton
                    className="py-1 rounded-none"
                    disabled={getTabs().length >= 5}
                    onClick={addTab}>
                    <AddIcon />
                </IconButton>
            </li>
        </ul>
    );
};

export default SalesPageTabs;