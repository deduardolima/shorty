import { Avatar } from "@mui/material";
import styled from "styled-components";


export const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    
`

export const ImageContainer = styled.div`
    display: flex;
    background-color: #00000;
     
`
export const MenuContainerSpace = styled.div`
    height: 3.062rem;
`

export const MenuDiv = styled.nav`
    font-family: Nunito,sans-serif!important;
    display: flex;
    margin-top: 2rem;
    width: 100%;
    align-items: center;
    justify-items: center;
    justify-content: space-around;
    height: 3.063rem;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.2), 0 -2px 1px -1px rgba(0, 0, 0, 0.12), 0 -1px 1px 0 rgba(0, 0, 0, 0.14);
    background-color: #f44336;

`

export const ShortyNav = styled.div`
display: flex;
align-items: center;
cursor: pointer;
&&{
    color: #fff;
    height: 3.063rem;    
}

`

export const CounterNav = styled.div`
display: flex;
align-items: center;
cursor: pointer;
&&{
    color: #fff;
    height: 3.063rem;    
}
`
export const AvatarStyled = styled(Avatar)`


`