import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL_SHORTY } from "../../constants/urls";
import { ButtonStyled } from "../../Global/GlobalStyled";
import { goToShortyId } from "../../routes/coordinator";

import { ButtonContainer, ContainerCard, TextFieldStyled } from "./styled";



const QueryShorty = () => {
    const [inputId, setInputId] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();


    const getShorty = async () => {

        await axios.get(`${BASE_URL_SHORTY}/${inputId}`)
            .then((res) => {
                setIsLoading(false);
                goToShortyId(navigate, res.data._id)

            }).catch((err) => {
                alert(err.response.data.message);
                setIsLoading(false);
            })
    }

    return (

        <ContainerCard>
            <TextFieldStyled
                id="outlined-basic"
                label={"ID"}
                name='ID'
                type={'text'}
                variant="outlined"
                placeholder={'Informe ID do Shorty'}
                value={inputId}
                onChange={(event) => setInputId(event.target.value)}
                required
            />
            <ButtonContainer>
                <ButtonStyled onClick={() => getShorty()} >
                    {isLoading ? <CircularProgress color={"inherit"} size={24} /> : <>Consultar</>}
                </ButtonStyled>
            </ButtonContainer>

        </ContainerCard>


    )
}
export default QueryShorty;