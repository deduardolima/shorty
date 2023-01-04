import React, { useState } from "react";
import LogoCondor from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { AvatarStyled, CounterNav, ImageContainer, MenuContainer, MenuContainerSpace, MenuDiv, ShortyNav } from "./styled";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { goToCounter, goToCreate } from "../../routes/coordinator";


const settings = ["Perfil", "Dashboard", "Logout"];

const MenuApp = () => {

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navigate = useNavigate()

    return (
        <MenuContainer>
            <MenuContainerSpace></MenuContainerSpace>
            <ImageContainer>
                <img src={LogoCondor} alt=" logo condor"></img>
            </ImageContainer>
            <MenuDiv>
                <ShortyNav onClick={() => goToCreate(navigate)}>Encurtador</ShortyNav>
                <CounterNav onClick={() => goToCounter(navigate)} >Contador</CounterNav>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <AvatarStyled alt="avatar" src={LogoCondor} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </MenuDiv>

        </MenuContainer>
    )
}

export default MenuApp;