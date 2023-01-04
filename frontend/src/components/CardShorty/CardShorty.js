import { useNavigate } from "react-router-dom"
import { SHORTCUT } from "../../constants/urls"
import { goToShortyId } from "../../routes/coordinator"
import { CardEstilizado, Infos, NameShorty } from "./styled"


const CardShorty = (props) => {

    const navigate = useNavigate()

    const onClickCard = (id) => {
        goToShortyId(navigate, id)
    }
    
    return (
        <CardEstilizado onClick={() => onClickCard(props.short._id)}>
            <NameShorty gutterBottom variant="h5" component="div">
                {props.short.name}
            </NameShorty>
            <Infos variant="body2">
                Sms: {props.short.sms === true ? "Sim" : "Não"}
            </Infos>
            <Infos>Status: {props.short.status}</Infos>
            <Infos variant="body2">
                Origem: {props.short.origem}
            </Infos>
            <Infos variant="body2">
            {SHORTCUT}/{props.short.shorty}
            </Infos>
        </CardEstilizado>

    )

}

export default CardShorty;