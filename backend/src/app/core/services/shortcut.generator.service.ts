import { Injectable } from '@nestjs/common';

@Injectable()
export class ShortcutGenerator {
    generatorShortcut(number: Number) {
        let stringAleatoria = ""
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < number; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;


    }
}