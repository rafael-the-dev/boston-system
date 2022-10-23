import { Button, Typography } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css";

const Home = () => {

    return (
        <main>
            <section>
                <div className="bg-blue-500 px-5 pt-4 pb-12">
                    <Typography
                        component="h1"
                        className="font-bold text-2xl text-white">
                        Dashboard
                    </Typography>
                </div>
                <div className="relative">
                    <div className={classNames(classes.heroPanel, `absolute bg-white left-5 px-3 py-4`)}>
                        <Typography
                            component="h2"
                            className="">
                            Seja bem-vindo ao painel de gerenciamento
                        </Typography>
                        <div className="border-l-4 border-solid border-blue-500 bg-gray-200 mt-4 py-3 px-2">
                            <Typography>
                                <sapn className="font-medium">Hello, Rafael Tivane</sapn><br/>
                                <span className={classes.quote}>
                                    A vida e feita de escolhas...
                                </span>
                            </Typography>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;