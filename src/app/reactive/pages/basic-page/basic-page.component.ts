import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const dataBack = {
  name: 'TV50',
  price: 500,
  inStorage: 10,
};

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.myForm.reset(dataBack);
  }

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
      minlength: 'La longitud minima debe ser de 3',
      min: 'El minimo debe ser 0',
    };

    for (const element of Object.keys(errors) as Array<keyof typeof errorsMessages>) {
      return errorsMessages[element];
    }
    return '';
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log('this', this.myForm.value);

    this.myForm.reset({
      name: '',
      price: 0,
      inStorage: 0,
    });
  }
}
