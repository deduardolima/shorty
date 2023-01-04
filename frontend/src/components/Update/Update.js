import axios from "axios";
import dayjs from "dayjs";
import { Stack } from "@mui/system";
import Header from "../Header/Header";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import MenuShorty from "../MenuShorty/MenuShorty";
import { BASE_URL_SHORTY } from "../../constants/urls";
import { goToShortyId } from "../../routes/coordinator";
import useRequestData from "../../hooks/useRequestData";
import { ButtonStyled } from "../../Global/GlobalStyled";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ButtonContainer, Form, TextFieldStyled, UpdateContainer } from "./styled";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CircularProgress, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";


const Update = () => {
    const params = useParams()
    const [shortyDetails] = useRequestData([], `${BASE_URL_SHORTY}/${params.id}`);
    const [initialDate, setInitialDate] = useState(dayjs(''));
    const [finalDate, setFinalDate] = useState(dayjs(''));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [form, handleInputChange, setForm] = useForm({
        "name": shortyDetails.name,
        "description": shortyDetails.description,
        "link_destino": shortyDetails.link_destino,
        "start_date": "",
        "finish_date": "",
        "origem": shortyDetails.origem,
        "status": shortyDetails.status,
        "sms": shortyDetails.sms

    })


    const convertedDate = (data) => {
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual
    }

    const onSubmitFormUpdate = (event) => {
        event.preventDefault()
        const initial = convertedDate(initialDate.toDate());
        const finish = convertedDate(finalDate.toDate());
        updateShorty(initial, finish);
    }
    const updateShorty = async (initial, finish) => {
        setIsLoading(true)
        form.start_date = initial;
        form.finish_date = finish;

        await axios.patch(`${BASE_URL_SHORTY}/update/${shortyDetails._id}`, form)
            .then((res) => {
                setIsLoading(false);
                goToShortyId(navigate, params.id)

            })
            .catch((err) => {
                alert(err.response.data.message);
                console.log(err)
                setIsLoading(false);
            })
    }
    useEffect(() => {
    }, [])

    return (
        <UpdateContainer>
            <Header title={`Shortcut ${shortyDetails.name}`} back home />
            <MenuShorty />

            <Form onSubmit={onSubmitFormUpdate}>
                <TextFieldStyled
                    id="outlined-basic"
                    label={"Nome"}
                    name='name'
                    type={'text'}
                    variant="outlined"
                    value={form.name}
                    onChange={handleInputChange}

                />
                <TextFieldStyled
                    id="outlined-basic"
                    label={"Descrição"}
                    name='description'
                    type={'text'}
                    variant="outlined"
                    value={form.description}
                    onChange={handleInputChange}

                />
                <TextFieldStyled
                    id="outlined-basic"
                    label={"Link de Destino"}
                    name='link_destino'
                    type={'text'}
                    variant="outlined"
                    value={form.link_destino}
                    onChange={handleInputChange}

                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DatePicker

                            disablePast
                            label="Data de Início"
                            inputFormat="DD/MM/YYYY"
                            openTo="day"
                            views={['day', 'month', 'year']}
                            value={initialDate}
                            onChange={(newValue) => {
                                setInitialDate(newValue);
                            }}
                            required
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
                    {isLoading ? <CircularProgress color={"inherit"} size={24} /> : <>Salvar</>}
                </ButtonStyled>
                </ButtonContainer>


            </Form>

        </UpdateContainer>

    )

}
export default Update;