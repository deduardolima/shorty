import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import Header from "../Header/Header";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom"
import MenuShorty from "../MenuShorty/MenuShorty";
import { BASE_URL_SHORTY } from "../../constants/urls";
import { ButtonStyled } from "../../Global/GlobalStyled";
import { useGlobal } from "../../Global/GlobalStateContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { goToShortyCreated } from "../../routes/coordinator";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ButtonContainer, Form, TextFieldStyled, UploadContainer } from "./styled";
import { Checkbox, CircularProgress, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";


const Upload = () => {
    const { setters } = useGlobal()
    const { setShorty } = setters;
    const [file, setFile] = useState(null)
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
    const navigate = useNavigate()
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const convertedDate = (data) => {
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual
    };

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

        const dataForm = new FormData();
        dataForm.append("file", file)
        dataForm.append("name", form.name);
        dataForm.append("shorty", form.shorty);
        dataForm.append("description", form.description);
        dataForm.append("sms", `${checked}`);
        dataForm.append("link_destino", form.link_destino);
        dataForm.append("start_date", form.start_date);
        dataForm.append("finish_date", form.finish_date);
        dataForm.append("status", form.status);
        dataForm.append("origem", form.origem);

        try {
            await axios.post(`${BASE_URL_SHORTY}/upload`, dataForm, {
                headers: {
                    "Content-type": `multipart/form-data`,
                },
            })
                .then((res) => {
                    setIsLoading(false);
                    setShorty(res.data.linkShorty);
                    goToShortyCreated(navigate);
                })
        } catch (err) {
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
        }
    }

    return (
        <UploadContainer>
            <Header title={"Novo Encurtador"} back home />
            <MenuShorty />
            <Form onSubmit={onSubmitFormCreate} enctype="multipart/form-data">

                <TextFieldStyled
                    id="outlined-basic"
                    name='file'
                    type={'file'}
                    onChange={handleFile}
                    required
                />

                <TextFieldStyled
                    id="outlined-basic"
                    label={"Nome"}
                    name='name'
                    type={'text'}
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
                    variant="outlined"
                    value={form.shorty}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 7, title: "Shortcut com maximo de 5 caracteres para SMS e 7 para Web" }}
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
                    <FormControlLabel value="condor" control={<Radio />} label="condor" />
                    <FormControlLabel value="auto-posto" control={<Radio />} label="auto-posto" />
                    <FormControlLabel value="gigante" control={<Radio />} label="gigante" />
                </RadioGroup>
                <ButtonContainer>
                    <ButtonStyled type='submit' >
                        {isLoading ? <CircularProgress color={"inherit"} size={24} /> : <>Criar</>}
                    </ButtonStyled>
                </ButtonContainer>

            </Form>

        </UploadContainer>

    )
}
export default Upload;