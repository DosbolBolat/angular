import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Загрузить первых 20 покемонов
  getAll() {
    return this.http.get<any>(`${this.baseUrl}?limit=20`);
  }

  // Поиск по имени
  searchByName(name: string) {
    return this.http.get<any>(`${this.baseUrl}/${name.toLowerCase()}`).pipe(
      catchError(() => of(null))
    );
  }
}
