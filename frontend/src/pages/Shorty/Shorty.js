import React from "react"
import Header from "../../components/Header/Header";
import MenuShorty from "../../components/MenuShorty/MenuShorty";
import QueryShorty from "../../components/QueryShorty/QueryShorty";
import { ShortyContainer } from "./styled";


const Shorty = () => {



    return (
        <ShortyContainer>
            <Header title={"Encurtador"} back home />
            <MenuShorty></MenuShorty>
            <QueryShorty></QueryShorty>
        </ShortyContainer>
    )
}


export default Shorty;