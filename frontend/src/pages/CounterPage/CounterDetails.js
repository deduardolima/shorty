import axios from "axios";
import dayjs from "dayjs";
import { CircularProgress, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { BASE_URL_COUNTER, BASE_URL_SHORTY } from "../../constants/urls";
import useRequestData from "../../hooks/useRequestData";
import { App, ButtonStyled, ClickContainer, ContainerCardClick, CountContainer, Text } from "./styled";


const CounterDetails = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState();
    const [count, setCount] = useState()
    const [clicks, setClicks] = useState();
    const [initialDate, setInitialDate] = useState(dayjs(''));
    const [finishDate, setFinishDate] = useState(dayjs(''));
    const [short, setShort] = useRequestData([], `${BASE_URL_SHORTY}/${params.id}`);


    const getClicks = async () => {
        await axios.get(`${BASE_URL_COUNTER}/counter/${params.id}`)
            .then((res) => {
                setClicks(res.data.results)
                setCount(res.data.count);
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getClicks();
    }, [pageNumber]);

    const convertedDate = (data) => {
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual
    }
    const initial = convertedDate(initialDate.toDate());
    const finish = convertedDate(finishDate.toDate());

    const createAtConverted = (date) => {
        const createAt = new Date(date);
        const result = convertedDate(createAt)
        return result
    }

    const getClicksFilter = async () => {
        const body = {
            "id": short._id,
            "start_date": initial,
            "finish_date": finish
        }
        await axios.post(`${BASE_URL_COUNTER}/filter`, body)
            .then((res) => {
                setClicks(res.data.results)
                setCount(res.data.count);
            }).catch((err) => {
                console.log(err)
            })
    }


    const feedClicks = clicks && clicks.map((click) => {
        return <ClickContainer
            key={click._id}
        >
            <p>ID Shorty: {click.shorty_id}</p>
            <p>Click em: {createAtConverted(click.create_at)}</p>

        </ClickContainer>
    })



    return (
        <App>
            <Header title={`Contador`} back home />
            <CountContainer>
                <strong>Nome: {short.name}</strong><strong> Total de Clicks: {count}</strong>
                <></>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DatePicker
                            required
                            label="Insira data inicial"
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
                            required
                            label="Insira data final"
                            inputFormat="DD/MM/YYYY"
                            openTo="day"
                            views={['day', 'month', 'year']}
                            value={finishDate}
                            onChange={(newValue) => {
                                setFinishDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <ButtonStyled onClick={() => getClicksFilter()}
                >{isLoading ? <CircularProgress color={"inherit"} size={24} /> : <>Consultar</>}</ButtonStyled>
            </CountContainer>
            <ContainerCardClick>
                {feedClicks && feedClicks.length > 0 ? feedClicks : <Text>Sem Clicks registrados</Text>}
            </ContainerCardClick>
        </App>
    )

}

export default CounterDetails;