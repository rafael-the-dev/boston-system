import * as React from "react";
import { useRouter } from "next/router";

import LogoutIcon from '@mui/icons-material/Logout';

import { LoginContext } from "src/context";

import ListItem from "src/components/list-item-button"

const Container = () => {
    const { logoutHelper, user } = React.useContext(LoginContext);
    const router = useRouter();

    const [ loading, setLoading ] = React.useState(false);

    const clickHandler = React.useCallback(() => {
        setLoading(true);

        logoutHelper()
            .then(res => { router.push('/login')})
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, [ logoutHelper ])

    return (
        <ListItem 
            classes={{ button: "capitalize" }}
            onClick={clickHandler}>
            { loading ? "Loading..." : (
                <>
                    <LogoutIcon />
                    Sair
                </>
            ) }
        </ListItem>
    );
};

export default Container;