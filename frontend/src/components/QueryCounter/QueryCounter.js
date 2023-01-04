import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToCounterID } from "../../routes/coordinator";
import { ButtonStyled, Container, ContainerCard, TextFieldStyled } from "./styled";


const QueryCounter = () => {
    const [inputId, setInputId] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const onClickInput = (id) => {
        goToCounterID(navigate, id)
    }

    return (
        <Container>
            <ContainerCard>
                <TextFieldStyled
                    id="outlined-basic"
                    label={"ID"}
                    name='ID'
                    type={'text'}
                    variant="outlined"
                    value={inputId}
                    onChange={(event) => setInputId(event.target.value)}
                    required
                />
                <ButtonStyled onClick={() => onClickInput(inputId)} >
                    {isLoading ? <CircularProgress color={"inherit"} size={24} /> : <>Consultar</>}
                </ButtonStyled>

            </ContainerCard>
        </Container>
    )

}
export default QueryCounter;