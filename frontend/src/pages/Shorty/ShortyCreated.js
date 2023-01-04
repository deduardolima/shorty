import Header from "../../components/Header/Header";
import MenuShorty from "../../components/MenuShorty/MenuShorty";
import { useGlobal } from "../../Global/GlobalStateContext";
import { BoxInfo, ContainerCard, ImageContainer, Infos, NameShorty, ShortyContainer } from "./styled";



const ShortyCreated = () => {
    const { states, setters } = useGlobal();
    const { shorty } = states;
    const { setShorty } = setters;


    const convertedDate = (data) => {
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual
    }
    const initialDate = new Date(shorty.shorty.start_date);
    const finalDate = new Date(shorty.shorty.finish_date);

    const initialConverted = convertedDate(initialDate);
    const finishConverted = convertedDate(finalDate);
    const currentDate = new Date();

    return (
        <ShortyContainer>
            <Header title={"Encurtador"} back home />
            <MenuShorty></MenuShorty>
            <ContainerCard>
                <NameShorty>{shorty.shorty.name}</NameShorty>
                <BoxInfo>
                    <Infos>ID: {shorty.shorty._id}</Infos>
                    <Infos>Descrição: {shorty.shorty.description}</Infos>
                    <Infos>Link: <a href={shorty.shorty.link_destino} target="_blank" rel="noopener noreferrer">{shorty.shorty.link_destino.lenth > 80 ? shorty.shorty.link_destino : `clique aqui`}</a> </Infos>
                    <Infos>Data de Início: {initialConverted}</Infos>
                    <Infos>Data Final: {finalDate > currentDate ? finishConverted : "Não expira"}</Infos>
                    <Infos>SMS: {shorty.shorty.sms === true ? "Sim" : "Não"}</Infos>
                    <Infos>Origem: {shorty.shorty.origem}</Infos>
                    <Infos>Shorty: <a href={shorty.shortcut} target="_blank" rel="noopener noreferrer">{shorty.shortcut}</a> </Infos>
                </BoxInfo>
                <ImageContainer src={shorty.qrCode} />

            </ContainerCard>
        </ShortyContainer>
    )


}


export default ShortyCreated;