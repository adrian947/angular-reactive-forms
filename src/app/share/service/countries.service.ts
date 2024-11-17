import { Injectable } from '@angular/core';
import {
  Country,
  Region,
  SmallCountry,
} from '../../../interfaces/countries.interfaces';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private baseURL: string = 'https://restcountries.com/v3.1';

  private __regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];
  constructor(private http: HttpClient) {}

  get regions(): Region[] {
    return [...this.__regions];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);

    const url: string = `${this.baseURL}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      )
    );
  }

  getCountryByCode(code: string): Observable<SmallCountry> {
    if (!code) return of();
    const url: string = `${this.baseURL}/alpha/${code}?fields=cca3,name,borders`;
    return this.http.get<Country>(url).pipe(
      map((country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      }))
    );
  }
}
