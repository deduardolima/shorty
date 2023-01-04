import * as qr from 'qr-image';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QrCodeGenerator {
    public generateQrCode = async (name: string, url: string) => {
                
        const basePath = path.join('public', 'qrcode', `${name}.svg`);
        const qrImage = qr.image(url,{ type: 'svg' });
        qrImage.pipe(require('fs').createWriteStream(basePath));
        
        return `${process.env.BASE_URL}/qrcode/${name}.svg`;
        
     }
}
