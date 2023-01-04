import { Button, TextField } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
display: flex;
justify-content: space-around;

`

export const ContainerCard = styled.div`
display: flex;
width: 40%;
flex-direction: column;
align-items: center;
padding: 15px;
background-color: #FFFFFF;
margin: 0.5rem 0;
border-radius: 8px;
`
export const TextFieldStyled = styled(TextField)`
width: 100% ;
margin-bottom: 1rem;
`

export const ButtonStyled = styled(Button)`
    &&{
        background-color: #f44336 ;
        color: #fff ;
        width: 40%;
        margin-top:0.5rem;
    }
`