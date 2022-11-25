import * as React from "react";

import { fetchHelper, getAuthorizationHeader } from "src/helpers/queries"

import CancelLink from "src/components/cancel-link";
import Content from "src/components/scroll-container";
import Main from "src/components/main";
import Panel from "src/components/panel";
import Table from "src/components/default-table";

const Container = () => {
    const [ providersList, setProvidersList ] = React.useState([]);

    const headers = React.useRef([
        { label: "Nome", value: "name" },
        { label: "NUIT", value: "nuit" },
        { label: "Address", value: "address" },
    ]);

    const filteredList = () => providersList;

    const cancelLinkMemo = React.useMemo(() => <CancelLink href="/" />, [])

    const panel = React.useMemo(() => (
        <Panel 
            component="h1"
            title="Stock providers"
        />
    ), []);

    const fetchData = React.useCallback(async () => {
        try {
            const data = await fetchHelper({ options: getAuthorizationHeader(), url: "/api/stock-providers"});
            setProvidersList(data);
        } catch(e) {

        }
    }, []);

    React.useEffect(() => {
        fetchData()
    }, [ fetchData ]);

    return (
        <Main>
            { panel }
            <Content>
                <Table 
                    data={filteredList()}
                    headers={headers}
                />
                <div className="flex items-stretch justify-end">
                    { cancelLinkMemo }
                </div>
            </Content>
        </Main>
    );
};

export default Container;