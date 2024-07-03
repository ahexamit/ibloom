// emaildirective.ts
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    // const emailPattern = /[a-zA-Z][a-zA-Z0-9_]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    // const emailPattern = /^[^\s][a-zA-Z0-9_]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    const emailPattern = /^(?!.*\s)[a-zA-Z][a-zA-Z0-9_]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;


    if (control.value && !emailPattern.test(control.value)) {
      return { emailValidator: true };
    }

    return null;
  };
}
