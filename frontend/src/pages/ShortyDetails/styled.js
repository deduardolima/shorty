import { Button } from "@mui/material";
import styled from "styled-components";


export const App = styled.div`
display: flex;
background-color:#e1e1e1;
width: 100%;
height: 100vh;
align-items: center;
flex-direction: column
`
export const ContainerCard = styled.div`
display: flex;
flex-direction: column;
min-width:40%;
align-items: center;
padding: 20px;
background-color: #FFFFFF;
margin: 2rem 0;
border-radius: 15px;
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
&&{
    background-color: #f44336 ;
    color: #fff ;
    width:  200px;
    margin-top:1rem;
    border-radius: 15px;

}
`