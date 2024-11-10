import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  constructor() {}

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    if (control.value.trim().toLowerCase() === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  };

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string){
    return (formGroup: AbstractControl ): ValidationErrors | null =>{
      const fieldValueOne = formGroup.get(fieldOne)?.value || '';
      const fieldValueTwo = formGroup.get(fieldTwo)?.value || '';
      if(fieldValueOne !== fieldValueTwo){
        formGroup.get(fieldTwo)?.setErrors({notEqual: true})
        return {
          passwordsNotEqual: true,
        }
      }
      formGroup.get(fieldTwo)?.setErrors(null)
      return null

    }
  }
}
