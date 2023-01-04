import axios from "axios";
import dayjs from 'dayjs';
import Header from "../Header/Header";
import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import MenuShorty from "../MenuShorty/MenuShorty";
import { BASE_URL_SHORTY } from "../../constants/urls";
import { ButtonStyled } from "../../Global/GlobalStyled";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGlobal } from "../../Global/GlobalStateContext";
import { goToShortyCreated } from "../../routes/coordinator";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ButtonContainer, CreateContainer, Form, TextFieldStyled } from "./styled";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Checkbox, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";


const Create = () => {
    const { setters } = useGlobal()
    const { setShorty } = setters
    const [checked, setChecked] = useState(true);
    const [errShorty, setErrShorty] = useState('')
    const [checkErr, setCheckErr] = useState(false)
    const [initialDate, setInitialDate] = useState(dayjs(''));
    const [finalDate, setFinalDate] = useState(dayjs(''));
    const [isLoading, setIsLoading] = useState(false)
    const [form, handleInputChange] = useForm({
        "name": "",
        "description": "",
        "shorty": "",
        "link_destino": "",
        "start_date": "",
        "finish_date": "",
        "sms": "",
        "status": 1,
        "origem": "",
    })
    const navigate = useNavigate();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const convertedDate = (data) => {
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual
    }

    const onSubmitFormCreate = (event) => {
        event.preventDefault()
        const initial = convertedDate(initialDate.toDate());
        const finish = convertedDate(finalDate.toDate());
        createNewShorty(initial, finish);

    }
    const createNewShorty = async (initial, finish) => {
        setIsLoading(true)
        form.start_date = initial;
        form.finish_date = finish;
        form.sms = checked

        await axios.post(`${BASE_URL_SHORTY}/create`, form)
            .then((res) => {
                setIsLoading(false);
                setShorty(res.data);
                goToShortyCreated(navigate);

            })
            .catch((err) => {
                if (err.response.data.message.includes('O tamanho maximo permitido')) {
                    setErrShorty(err.response.data.message)
                    setCheckErr(true)
                    setIsLoading(false)
                } else if (err.response.data.message.includes('O tamanho do shortcut customizado')) {
                    setErrShorty(err.response.data.message)
                    setCheckErr(true)
                    setIsLoading(false)

                } else {
                    console.log(err.response)
                    alert(err.response.data.message);
                    setIsLoading(false);
                }
            })
    }

    return (
        <CreateContainer>
            <Header title={"Novo Encurtador"} home back />
            <MenuShorty />
            <Form onSubmit={onSubmitFormCreate}>
                <TextFieldStyled
                    id="outlined-basic"
                    label={"Nome"}
                    name='name'
                    type={'text'}
                    placeholder={'Nome para Shortcut'}
                    variant="outlined"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                />
                <TextFieldStyled
                    id="outlined-basic"
                    label={"Descrição"}
                    name='description'
                    type={'text'}
                    variant="outlined"
                    placeholder={'Insira uma descrição'}
                    value={form.description}
                    onChange={handleInputChange}
                    required
                />
                <TextFieldStyled
                    id="outlined-basic"
                    error={checkErr}
                    helperText={checkErr ? errShorty : ''}
                    label={"Encurtador Customizado"}
                    name='shorty'
                    type={'text'}
                    placeholder={'Shortcut com maximo de 5 caracteres para SMS e 7 para Web'}
                    variant="outlined"
                    value={form.shorty}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 7, title: "Shortcut com maximo de 5 caracteres para SMS e 7 para Web" }}
                />
                <TextFieldStyled
                    id="outlined-basic"
                    label={"Link de Destino"}
                    name='link_destino'
                    type={'text'}
                    placeholder={'Insira o link'}
                    variant="outlined"
                    value={form.link_destino}
                    onChange={handleInputChange}
                    required
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DatePicker
                            required
                            disablePast
                            label="Data de Início"
                            inputFormat="DD/MM/YYYY"
                            openTo="day"
                            views={['day', 'month', 'year']}
                            value={initialDate}
                            onChange={(newValue) => {
                                setInitialDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>

                        <DatePicker
                            disablePast
                            inputFormat="DD/MM/YYYY"
                            label="Data Final"
                            openTo="day"
                            views={['day', 'month', 'year']}
                            value={finalDate}
                            onChange={(newValue) => {
                                setFinalDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <Typography variant="h7">SMS</Typography>
                <FormControlLabel
                    control={<Checkbox
                        label="SMS"
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}

                    />}
                />
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="condor"
                    name="origem"
                    value={form.origem}
                    onChange={handleInputChange}
                >
                    <FormControlLabel value="condor" control={<Radio />} label="Condor" />
                    <FormControlLabel value="auto-posto" control={<Radio />} label="Auto Posto" />
                    <FormControlLabel value="gigante" control={<Radio />} label="Gigante" />
                </RadioGroup>
                <ButtonContainer>
                    <ButtonStyled type='submit' >
                        {isLoading ? <CircularProgress color={"inherit"} size={24} /> : <>Criar</>}
                    </ButtonStyled>

                </ButtonContainer>


            </Form>

        </CreateContainer >
    )
}


export default Create;