import { TextField } from "@mui/material";
import styled from "styled-components";


export const UploadContainer = styled.div`
display: flex;
width: 100%;
height: 100vh;
background-color:#e1e1e1;
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
width: 70%;
`

export const TextFieldStyled = styled(TextField)`
width: 100% ;
`

export const ButtonContainer = styled.div`
display: flex;
justify-content: center
`