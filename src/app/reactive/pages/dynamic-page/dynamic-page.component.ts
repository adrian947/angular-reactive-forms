import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css',
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoritesGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Mario', Validators.required],
    ]),
  });

  public favorite: FormControl = new FormControl('', Validators.required)

  constructor(private fb: FormBuilder) {}

  get favoriteGames() {
    return this.myForm.get('favoritesGames') as FormArray;
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

    for (const element of Object.keys(errors) as Array<
      keyof typeof errorsMessages
    >) {
      return errorsMessages[element];
    }
    return '';
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  addFavoriteGame() {
    if (this.favorite.invalid) return;
    const newFavorite = this.favorite.value;
    this.favoriteGames.push(this.fb.control(newFavorite, Validators.required));

    this.favorite.reset()
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      return;
    }

    console.log('this', this.myForm.value);
  }
}
