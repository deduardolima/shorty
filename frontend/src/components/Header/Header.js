import { ArrowBackIosNew } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerHeader, Title } from './styled';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { goBack, goToHome } from '../../routes/coordinator';


const Header = ({ title, back, home, logout }) => {

    const navigate = useNavigate()

    return (
        <ContainerHeader>
            {back && <ArrowBackIosNew onClick={() => goBack(navigate)} />}
            <Title>{title}</Title>
            {home && < HomeRoundedIcon onClick={() => goToHome(navigate)} />}
            
        </ContainerHeader>
    )
}

export default Header