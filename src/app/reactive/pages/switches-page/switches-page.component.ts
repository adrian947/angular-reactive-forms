import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css',
})
export class SwitchesPageComponent {
  public myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wasNotification: [true, [Validators.required]],
    TermsAndConditions: [false, [Validators.requiredTrue]],
  });

  constructor(private fb: FormBuilder) {}

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    const errorsMessages = {
      required: 'Este campo es requirido',
    };

    for (const element of Object.keys(errors) as Array<keyof typeof errorsMessages>) {
      return errorsMessages[element];
    }
    return '';
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log('tsa',this.myForm.value )
  }
}
