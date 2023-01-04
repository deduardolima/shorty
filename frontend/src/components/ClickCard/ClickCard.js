import { ClickContainer } from "./styled";


const ClickCard = (props) => {

    const convertedDate = (data) => {
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual
    }


    const createAt = new Date(props.counter.create_at);
    const createAtConverted = convertedDate(createAt)

    return (
        <div>
            <p>Clicks no dia: {props.counter.length} </p>
            <ClickContainer>

                <p>ID Shorty: {props.counter.shorty_id}</p>
                <p>Click em: {createAtConverted}</p>


            </ClickContainer>
        </div>
    )
}

export default ClickCard