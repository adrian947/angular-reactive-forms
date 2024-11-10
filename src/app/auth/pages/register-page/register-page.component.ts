import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../share/service/validators.service';
import { EmailValidatorService } from '../../../share/validators/emails-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group(
    {
      name: ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
      email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidatorService]],
      user: ['', [Validators.required, this.validatorService.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.isFieldOneEqualFieldTwo('password', 'password2'),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) {}

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    const errorsMessages = {
      required: 'Este campo es requirido',
      minlength: 'La longitud minima debe ser de 3',
      min: 'El minimo debe ser 0',
    };

    for (const element of Object.keys(errors) as Array<
      keyof typeof errorsMessages
    >) {
      return errorsMessages[element];
    }
    return '';
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log('my form', this.myForm.value);
  }
}
