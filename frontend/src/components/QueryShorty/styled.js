import { Button, TextField } from "@mui/material";
import styled from "styled-components";

export const App = styled.div`
display: flex;
background-color:#6495ED;
width: 100%;
height: 100vh;
align-items: center;
flex-direction: column
`
export const ContainerCard = styled.div`
display: flex;
width: 30%;
flex-direction: column;
align-items: center;
padding: 20px;
background-color: #FFFFFF;
margin: 0.5rem 0;
border-radius: 8px;
`
export const TextFieldStyled = styled(TextField)`
width: 100% ;
`

export const ButtonContainer = styled.div`
display: flex;
justify-content: center;
width:100%;
margin:1rem;    
    
`