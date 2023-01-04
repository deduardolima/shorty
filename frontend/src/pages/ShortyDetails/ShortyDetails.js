import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import MenuShorty from "../../components/MenuShorty/MenuShorty";
import { BASE_URL_COUNTER, BASE_URL_SHORTY, SHORTCUT } from "../../constants/urls";
import useRequestData from "../../hooks/useRequestData";
import { goToUpdate } from "../../routes/coordinator";
import { BoxInfo } from "../Shorty/styled";
import { App, ButtonStyled, ContainerCard, Infos, NameShorty } from "./styled";


const ShortyDetails = () => {
    const params = useParams()
    const [shortyDetails] = useRequestData([], `${BASE_URL_SHORTY}/${params.id}`);
    const [count, setCount] = useState();
    const navigate = useNavigate()

    const convertedDate = (data) => {
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual
    }
    const initialDate = new Date(shortyDetails.start_date);

    let status = shortyDetails.status
    switch (status) {
        case 0:
            status = "RASCUNHO";
            break;
        case 1:
            status = "PUBLICADO";
            break;
        case 2:
            status = "CANCELADO";
            break;
        case 3:
            status = "EXPIRADO";
            break;
        case 4:
            status = "ARQUIVADO";
            break;
        default: status = shortyDetails.status;
    }

    const finalDate = new Date(shortyDetails.finish_date);
    const createAt = new Date(shortyDetails.create_at);

    const createAtConverted = convertedDate(createAt)
    const initialConverted = convertedDate(initialDate);
    const finishConverted = convertedDate(finalDate);
    const date = new Date(0);
    const invalidDate = convertedDate(date);

    const getClicks = async () => {
        await axios.get(`${BASE_URL_COUNTER}/${shortyDetails._id}`)
            .then((res) => {
                setCount(res.data.count);
            }).catch((err) => {
                console.log(err)
            })
    }
    const onClickButton = (id) => {
        goToUpdate(navigate, id)
    }

    useEffect(() => {
        getClicks()
    })


    return (
        <App>
            <Header title={`Shortcut ${shortyDetails.name} `} back home />
            <MenuShorty />
            <ContainerCard>
                <NameShorty>{shortyDetails.name}</NameShorty>
                <BoxInfo>
                    <Infos>ID: {shortyDetails._id}</Infos>
                    <Infos>Descrição: {shortyDetails.description}</Infos>
                    <Infos>Link: <a href={shortyDetails.link_destino} target="_blank" rel="noopener noreferrer">{`clique aqui`}</a> </Infos>
                    <Infos>Data de Início: {initialConverted}</Infos>
                    <Infos>Data Final: {finishConverted !== invalidDate ? finishConverted : "Não Expira"}</Infos>
                    <Infos>SMS: {shortyDetails.sms === true ? "Sim" : "Não"}</Infos>
                    <Infos>Status: {status}</Infos>
                    <Infos>Origem: {shortyDetails.origem}</Infos>
                    <Infos>Shorty: <a href={`${SHORTCUT}/${shortyDetails.shorty}`} target="_blank" rel="noopener noreferrer">{`${SHORTCUT}/`}{shortyDetails.shorty}</a> </Infos>
                    <Infos>Clicks: {count} </Infos>
                    <Infos>Criado em : {createAtConverted}</Infos>
                </BoxInfo>
                <ButtonStyled onClick={() => onClickButton(params.id)}>Editar</ButtonStyled>

            </ContainerCard>

        </App>
    )

}

export default ShortyDetails;