import Header from "../../components/Header/Header";
import MenuShorty from "../../components/MenuShorty/MenuShorty";
import QueryShorty from "../../components/QueryShorty/QueryShorty";
import { ShortyContainer } from "./styled";



const GetShorty = () => {


    return (
        <ShortyContainer>
            <Header title={"Consulta"} back home />
            <MenuShorty></MenuShorty>
            <QueryShorty></QueryShorty>

        </ShortyContainer>
    )




}
export default GetShorty;