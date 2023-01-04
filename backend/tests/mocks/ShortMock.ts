import { CreateShortyDto, ORIGEM_TYPES } from "../../src/app/modules/shorty/dto/create-shorty.dto"
import { UpdateShortyDto } from "../../src/app/modules/shorty/dto/update-shorty.dto"


const name = "loja_Av.Brasilia"
const link_destino = "https://www.youtube.com/watch?v=d-tx9D4a8dc"
const start_date = 1663780906
const finish_date = 1664424770
const description = "descrição qualquer ...."
const status = 0
const shortcut = "http://localhost:3000/dasxd"
const sms = true
const origem = ORIGEM_TYPES.CONDOR
const short = "dasxd"
const createAt = 20220922
const id = "140"



export const shortMock = {
    name,
    link_destino,
    start_date,
    finish_date,
    description,
    status,
    sms,
    origem,
    short,
    createAt,
    id
}

export const shortMock2 = {
    name,
    link_destino,
    start_date,
    finish_date,
    description,
    status,
    sms: false,
    origem,
    short,
    createAt,
    id: 80
}

export const shortMock3 = {
    name,
    link_destino,
    start_date,
    finish_date,
    description,
    status,
    sms,
    origem,
    createAt,
}
export const input: CreateShortyDto = {
    name: "banner_pinheirinho",
    description: "descrição qualquer .....",
    sms: false,
    shorty: "",
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "25/11/2022",
    finish_date: "25/12/2022",
    status: 1,
    origem: ORIGEM_TYPES.CONDOR
}

export const input2: CreateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    description: "descrição qualquer .....",
    sms: false,
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "25/10/2022",
    finish_date: "25/12/2022",
    status: 0,
    origem: ORIGEM_TYPES.AUTOPOSTO,
}

export const input3: CreateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    description: "descrição qualquer .....",
    sms: false,
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "25/11/2022",
    finish_date: "25/12/2022",
    status: 0,
    origem: ORIGEM_TYPES.CONDOR
}

export const input4: CreateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    description: "descrição qualquer .....",
    sms: false,
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "25/11/2022",
    finish_date: "25/11/2022",
    status: 0,
    origem: ORIGEM_TYPES.CONDOR
}
export const input5: CreateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    description: "",
    sms: true,
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "25/11/2022",
    finish_date: "25/11/2022",
    status: 0,
    origem: ORIGEM_TYPES.CONDOR
}
export const input6: CreateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    description: "descrição qualquer .....",
    sms: true,
    link_destino: "",
    start_date: "25/11/2022",
    finish_date: "25/11/2022",
    status: 0,
    origem: ORIGEM_TYPES.CONDOR
}
export const input7: CreateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    description: "descrição qualquer .....",
    sms: true,
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "25/11/2022",
    finish_date: "25/11/2022",
    status: 0,
    origem: ORIGEM_TYPES.CONDOR
}
export const input8: CreateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "92",
    description: "descrição qualquer ....",
    sms: true,
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "02/11/2022",
    finish_date: "25/12/2022",
    status: 0,
    origem: ORIGEM_TYPES.CONDOR
}
export const input9: UpdateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    description: "descrição qualquer",
    sms: false,
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "25/11/2022",
    finish_date: "25/12/2022",
    status: 0,
    origem: ORIGEM_TYPES.CONDOR
}
export const input10: UpdateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    description: "descrição qualquer",
    sms: false,
    link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: "25/11/2022",
    finish_date: "25/12/2022",
    status: 0,
    origem: ORIGEM_TYPES.CONDOR
}
export const shortcutMock: UpdateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    link_destino: "",
    sms: false,
    start_date: "",
    finish_date: "",
    description: "ldkasndjbsadbsajdaskjds",
    status: 2,
    origem: ORIGEM_TYPES.CONDOR,
}
export const shortcutMock2: UpdateShortyDto = {
    name: "banner_pinheirinho",
    shorty: "",
    link_destino: "",
    sms: false,
    start_date: "",
    finish_date: "",
    description: "ldkasndjbsadbsajdaskjds",
    status: 2,
    origem: ORIGEM_TYPES.GIGANTE,
}