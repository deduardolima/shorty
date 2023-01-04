import { TextField } from "@mui/material";
import styled from "styled-components";


export const UpdateContainer = styled.div`
display: flex;
background-color:#e1e1e1;
width: 100%;
height: 100vh;
align-items: center;
flex-direction: column;
`
export const Form = styled.form`
display: flex;
justify-content: space-evenly;
margin-top: 1rem;
margin-bottom: 1rem;
flex-direction: column;
height: 90%;
width: 60%;
`

export const TextFieldStyled = styled(TextField)`
width: 100% ;
border-radius: 15px;
`
export const ButtonContainer = styled.div`
display: flex;
justify-content: center;
`