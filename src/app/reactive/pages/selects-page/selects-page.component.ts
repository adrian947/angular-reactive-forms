import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../../share/service/countries.service';
import {
  Region,
  SmallCountry,
} from '../../../../interfaces/countries.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selects-page',
  templateUrl: './selects-page.component.html',
  styleUrl: './selects-page.component.css',
})
export class SelectsPageComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];
  public countriesBorders: string [] = [];
  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChange();
    this. onCountryChange();
  }

  get regionsOptions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChange() {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((value) => (this.countriesByRegion = value));
  }

  onCountryChange() {
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        switchMap((country) =>
          this.countriesService.getCountryByCode(country)
        )
      )

      .subscribe((value) => (this.countriesBorders = value.borders));
  }
}
