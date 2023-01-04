import { useNavigate } from "react-router-dom";
import { goToCreate, goToCreateUpload, goToQuery } from "../../routes/coordinator";
import { Create, CreateUpload, MenuDiv, Query } from "./styled";

const MenuShorty = () => {

    const navigate = useNavigate()
    return (
        <MenuDiv>
            <Create onClick={() => goToCreate(navigate)}>Novo Encurtador</Create>
            <CreateUpload onClick={() => goToCreateUpload(navigate)}>Encurtador com Arquivo</CreateUpload>
            <Query onClick={() => goToQuery(navigate)}>Consultar</Query>
        </MenuDiv>

    )
}

export default MenuShorty;