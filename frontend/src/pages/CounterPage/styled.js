import { Button } from "@mui/material";
import ReactPaginate from "react-paginate";
import styled from "styled-components";


export const CounterContainer = styled.div`
display: flex;
min-height: 100vh;
background-color: #6495ED;
align-items: stretch;
flex-direction: column;
`
export const Text = styled.div`
display:flex;
justify-content: center;
font-family: Roboto;
font-size: 1rem;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.39px;
margin-top: 5rem;
`

export const ContainerCardCounter = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, 20em);
margin-top:1.5rem;
justify-content: center;
grid-gap: 1em;
width: 60 auto;
min-height: 90px;
background-color: #6495ED;
`

export const ContainerCardClick = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`

export const ReactPaginateContainer = styled(ReactPaginate)`
  width: auto;
  list-style: none;
  display: flex;
  justify-content: center;


  a {
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #f44336;
  color: #FFFFFF;
;
cursor: pointer;

  :hover {
  color: #black;
  background: #f44336;
  }  
  
  }

  .paginationActive a {
  color: #FFFFFF;
  background: #f44336;

  }  
`

export const PaginateContainer = styled.div`
background-color: #6495ED;
`

export const App = styled.div`
display: flex;
background-color:#e1e1e1;
width: 100%;
align-items: stretch;
flex-direction: column;
`
export const ContainerCard = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
height: 60%;
background-color: #FFFFFF;
margin: 0.5rem 0;
border-radius: 8px;
`
export const NameShorty = styled.h3`
font-family: Roboto;
font-size: 1.5rem;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.39px;
color: #000000;
margin-bottom: 0.625rem;
`
export const Infos = styled.p`
font-family: Roboto;
font-size: 1rem;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.39px;
margin-top: -0.025rem;
`
export const BoxInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`
export const ButtonStyled = styled(Button)`
box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2), 0 -2px 1px -1px rgba(0, 0, 0, 0.12), 0 -1px 1px 0 rgba(0, 0, 0, 0.14);
&&{
    background-color: #f44336 ;
    color: #fff ;
    width:  20%;
    border-radius: 15px;

}
`
export const CountContainer = styled.div`
display: flex;
align-items: center;
padding:15px;
margin-left:-80px;
justify-content: space-evenly;
`
export const ClickContainer = styled.div`
display: flex;
justify-content: space-around;
border: solid 1px black;
background-color: #FFFFFF;
`

export const BoxInputSearch = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    margin-top: 0.5rem;
`
export const InputSearch = styled.input`
width: 50%;
margin: 0.5rem 0rem;
border-radius: 15px;
padding: 1rem 0.503rem 1rem 1.063rem;
box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2), 0 -2px 1px -1px rgba(0, 0, 0, 0.12), 0 -1px 1px 0 rgba(0, 0, 0, 0.14);
border: solid 1px gray;
`