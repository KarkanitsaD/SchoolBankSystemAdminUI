import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;
        const errros: ValidationErrors = [];
        if 
        (
            !value.includes('!') &&
            !value.includes('?') &&
            !value.includes('#') &&
            !value.includes('@') &&
            !value.includes('$') &&
            !value.includes('#') &&
            !value.includes('%') &&
            !value.includes('^') &&
            !value.includes('&') &&
            !value.includes('*')
        ) {
            errros['requiredSymbol'] = true;
        }

        if (value.length < 6) {
            errros['minLength'] = true;
        }

        if (value.length > 20) {
            errros['maxLength'] = true;
        }

        return errros;
    }
}