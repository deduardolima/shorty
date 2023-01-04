import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint } from 'class-validator';
import { ShortyService } from './shorty.service';

@ValidatorConstraint()
@Injectable()
export class IsShortcutAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private shortyService: ShortyService) { }
    
    validate(shorty: string): boolean | Promise<boolean> {
      
        return this.shortyService.findOneByShorty(shorty)
        .then(short => {
            if (short) return false;
            return true;
        });

    }
}
export function IsShortcutAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsShortcutAlreadyExistConstraint,
        });
    };
}