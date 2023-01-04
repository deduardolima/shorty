import styled from "styled-components";


export const ContainerHeader = styled.div` 
    width: 90vw;
    height: 2.75rem;
    margin-left: 1rem;
    display: grid;
    grid-template-columns: 25px 1fr 25px;
    justify-items: center;
    align-items: center;
    box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.25);
    
`
export const Title = styled.h1`
    font-family: Roboto;
    font-size: 1rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    text-align: center;
    grid-column-start: 2;
`
