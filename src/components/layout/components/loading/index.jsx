import * as React from "react";
import Typography from "@mui/material/Typography"
import { useRouter } from "next/router";

import { LoginContext } from "src/context"

const Loading = () => {
    const [ loading, setLoading ] = React.useState(true);
    const isFirstRender = React.useRef(true);

    const { addUser, saveUserInfo } = React.useContext(LoginContext);

    const router = useRouter();

    React.useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem("__cybersys-stock-management-app__"));
            const { token } = data.user;

            if(isFirstRender.current && Boolean(token)) {
                isFirstRender.current = false;

                const options = {
                    body: JSON.stringify({ role: "VALIDATE_TOKEN" }),
                    headers: {
                        "Authorization": `${token}` //Bearer  
                    },
                    method: "PUT"
                };

                fetch("/api/login", options)
                    .then(res => res.json())
                    .then(data => {
                        addUser(data);
                        router.push('/');
                        setLoading(false);
                    })
            } else {
                isFirstRender.current = false;
                setLoading(false);
                router.push('/login');
            }
        } catch(e) {
            isFirstRender.current = false;
            setLoading(false);
            router.push('/login');
        }

        isFirstRender.current = false;
    }, [ addUser ])

    if(!loading) return <></>;

    return (
        <div className="bg-white flex fixed h-screen items-center justify-center left-0 top-0 w-full z-10">
            <Typography>Loading...</Typography>
        </div>
    );
};

export default Loading;