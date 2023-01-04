import axios from "axios";
import React, { useEffect, useState } from "react";
import CardShorty from "../../components/CardShorty/CardShorty";
import MenuApp from "../../components/Menu/MenuApp";
import { BASE_URL_SHORTY } from "../../constants/urls";
import { Container, ContainerCardShorties, BoxInputSearch, InputSearch, ButtonStyled, ReactPaginateContainer } from "./styled";
import { CircularProgress } from "@mui/material";


const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState();
    const [shortyList, setShortyList] = useState([]);
    const [inputText, setInputText] = useState('')
 

    const getShorty = () => {
        const body = {
            "search": inputText
        }
        axios.post(`${BASE_URL_SHORTY}/search/${pageNumber}`, body)
            .then((res) => {
                setShortyList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getShorty();
    }, [pageNumber]);


    const feedShorties = shortyList && shortyList
        .map((short) => {
            return (
                <CardShorty key={short._id}
                    short={short}
                />
            )
        })

    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
    };


    return (
        <Container>
            <MenuApp />
            <BoxInputSearch >
                <InputSearch
                    value={inputText}
                    placeholder={"Nome Shortcut"}
                    onChange={(event) => setInputText(event.target.value)}
                />
                <ButtonStyled onClick={() => getShorty()} >{isLoading ? <CircularProgress color={"inherit"} size={24} /> : <>Consultar</>}</ButtonStyled>
            </BoxInputSearch>
            <ContainerCardShorties>
                {feedShorties}
            </ContainerCardShorties>
            <ReactPaginateContainer
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                pageCount={50}
                onPageChange={changePage}
                containerClassName={"paginationButtons"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </Container>
    );
}

export default Home;