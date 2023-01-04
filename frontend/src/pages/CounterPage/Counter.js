import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react"
import CardCounter from "../../components/CardCounter/CardCounter";
import Header from "../../components/Header/Header";
import { BASE_URL_COUNTER } from "../../constants/urls";
import { BoxInputSearch, ButtonStyled, ContainerCardCounter, CounterContainer, InputSearch, ReactPaginateContainer } from "./styled";


const Counter = () => {
    const [pageNumber, setPageNumber] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [inputText, setInputText] = useState('')
    const [counterList, setCounterList] = useState([]);


    const getSearch = () => {
        const body = {
            "search": inputText
        }
        axios.post(`${BASE_URL_COUNTER}/search/${pageNumber}`, body)
            .then((res) => {
                console.log(res)
                setCounterList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const feedCounters = counterList && counterList
        .map((counter) => {

            return (
                <CardCounter
                    key={counter._id}
                    counter={counter}
                />
            )
        });


    useEffect(() => {
        getSearch()
    }, [pageNumber]);

    const changePage = ({ selected }) => {
        setPageNumber(selected + 1);
    };

    return (
        <CounterContainer>
            <Header title={"Contador"} back home />
            <BoxInputSearch>
                <InputSearch
                    value={inputText}
                    placeholder={"Nome Shortcut"}
                    onChange={(event) => setInputText(event.target.value)}
                />
                <ButtonStyled onClick={() => getSearch()}>{isLoading ? <CircularProgress color={"inherit"} size={24} /> : <>Consultar</>}</ButtonStyled>
            </BoxInputSearch>
            <ContainerCardCounter>
                {feedCounters}
            </ContainerCardCounter>
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
        </CounterContainer>
    )
}


export default Counter;