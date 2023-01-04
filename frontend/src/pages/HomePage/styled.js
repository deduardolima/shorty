import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { Button } from "@mui/material";


export const Container = styled.div`
background-color: #1e73be;
height: 150vh;
`
export const BoxInputSearch = styled.form`
    display:flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 1rem;
    min-heigt:5rem;
    margin-top: 0.5rem;
`
export const InputSearch = styled.input`
    width: 40%;
    margin: 0.5rem 0rem;
    border-radius: 15px;
    padding: 1rem 0.503rem 1rem 1.063rem;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2), 0 -2px 1px -1px rgba(0, 0, 0, 0.12), 0 -1px 1px 0 rgba(0, 0, 0, 0.14);
    border: solid 1px gray;
`

export const ContainerCardShorties = styled.div`
display: grid;
margin-top:1rem;
grid-template-columns: repeat(auto-fit, 20em);
justify-content: center;
grid-gap: 1em;
width: 60 auto;
min-height: 90px;
background-color: #6495ED;
`

export const ButtonStyled = styled(Button)`
box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2), 0 -2px 1px -1px rgba(0, 0, 0, 0.12), 0 -1px 1px 0 rgba(0, 0, 0, 0.14);
    &&{
        background-color: #f44336;
        color: #fff ;
        width: 15%;
        height:10%;
        border-radius: 15px;
    }
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

