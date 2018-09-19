import { AbstractControl } from '@angular/forms';

export class ValidationService {

    private static passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,20}$/;
    
    // RFC 2822
    // tslint:disable-next-line    
    private static emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    static getValidatorErrorMessage(code: string) {
        const config = {
            'required': 'Required',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.'
        };
        return config[code];
    }

    static emailValidator(control: AbstractControl) {
        return control.value.match(this.emailRegex) ?
            null : { 'invalidEmailAddress': true };
    }

    static passwordValidator(control: AbstractControl) {
        return (control.value.match(this.passwordRegex)) ?
            null : { 'invalidPassword': true };
    }
}
