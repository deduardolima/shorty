import styled from "styled-components";

export const ShortyContainer = styled.div`
display: flex;
background-color:#e1e1e1;
min-height: 100vh;
align-items: center;
flex-direction: column;
`

export const ContainerCard = styled.div`
display: flex;
width:60%;
flex-direction: column;
align-items: center;
margin: 0.5rem 0;
border-radius: 8px;
`

export const NameShorty = styled.h3`
font-family: Roboto;
font-size: 1.5rem;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.39px;
color: #000000;
margin-bottom: 0.625rem;
`
export const Infos = styled.p`
font-family: Roboto;
font-size: 1rem;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.39px;
margin-top: -0.025rem;
`
export const BoxInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`

export const ImageContainer = styled.img`
width: 40%;
background-color: #FFFFFF;
height: 18rem;
border-radius: 8px;
margin-bottom: 1rem;
`