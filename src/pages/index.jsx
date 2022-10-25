import * as React from "react";
import { Button, Typography } from "@mui/material"
import classNames from "classnames"

import classes from "./styles.module.css";

import GroupIcon from '@mui/icons-material/Group';
import LiquorIcon from '@mui/icons-material/Liquor';

import { LoginContext } from "src/context";

import { HightlightCard } from "src/components/dashboard-page"

const Home = () => {
    const { loggedUser } = React.useContext(LoginContext);

    return (
        <main>
            <section className={classes.main}>
                <div className="bg-blue-500 px-5 pt-4 pb-12 sm:pt-8 sm:pb-16">
                    <Typography
                        component="h1"
                        className="font-bold text-2xl text-white">
                        Dashboard
                    </Typography>
                </div>
                <div className="relative">
                    <div className={classNames(classes.heroPanel, `absolute bg-white left-5 px-3 py-4 sm:px-4 sm:py-6`)}>
                        <Typography
                            component="h2"
                            className="">
                            Seja bem-vindo ao painel de gerenciamento
                        </Typography>
                        <div className="border-l-4 border-solid border-blue-500 bg-gray-200 mt-4 py-3 px-2 md:py-4 md:px-3">
                            <Typography>
                                <span className="font-medium">Hello, { loggedUser.firstName } { loggedUser.lastName }</span><br/>
                                <span className={classes.quote}>
                                    A vida e feita de escolhas...
                                </span>
                            </Typography>
                        </div>
                    </div>
                </div>
            </section>
            <div className={classNames(classes.highlightsContainer, "flex flex-wrap items-stretch justify-between px-5")}>
                <HightlightCard color="#fde68a" href="products" icon={<LiquorIcon />} title="Produtos" />
                <HightlightCard color="#fecaca" href="sale" icon title="Home"/>
                <HightlightCard color="#e9d5ff" href="sign-up?id=rafaeltivane" icon title="Home"/>
                <HightlightCard color="#a5f3fc" href="/" icon={<GroupIcon />} title="Usuarios"/>
            </div>
        </main>
    );
};

export default Home;