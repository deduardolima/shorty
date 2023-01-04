import { Injectable } from '@nestjs/common';

@Injectable()
export class ConvertDate {

    public toTimestamp = (strDate: any): number => {
        strDate = strDate.split("/");
        let newDate = new Date(strDate[2], strDate[1] - 1, strDate[0]);
        const converted = newDate.getTime()
        return converted
    }
    public currentDate = (): number => {
        const data = new Date()
        const dia = String((data.getDate())).padStart(2, '0');
        const mes = String((data.getMonth()) + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = dia + '/' + mes + '/' + ano;
        const convertedDate = this.toTimestamp(dataAtual);
        return convertedDate
    }

}