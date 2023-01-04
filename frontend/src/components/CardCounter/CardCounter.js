import { useNavigate,  } from "react-router-dom";
import { goToCounterID } from "../../routes/coordinator";
import { CardEstilizado } from "./styled";


const CardCounter = (props) => {

    const navigate = useNavigate();

    const onClickCard = (id) => {
        goToCounterID(navigate, id)
    }

    const convertedDate = (data) => {
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual
    }

    const createAt = new Date(props.counter.create_at);
    const createAtConverted = convertedDate(createAt);

    return (
        <CardEstilizado onClick={() => onClickCard(props.counter.shorty_id)}>
            <p>ID: {props.counter.shorty_id}</p>
            <p>Nome: {props.counter.name}</p>
            <p>Criado em: {createAtConverted}</p>


        </CardEstilizado>
    )

}

export default CardCounter;