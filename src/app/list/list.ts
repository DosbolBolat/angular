import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ListBehaviour } from './list-behaviour';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListComponent {
  loading = false;
  error = '';

  constructor(
    private http: HttpClient,
    public listBehaviour: ListBehaviour
  ) {}

  load() {
    if (this.listBehaviour.ListData.length > 0) {
      return;
    }

    this.loading = true;
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=20')
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe({
        next: (res) => {
          this.listBehaviour.setListData(res.results);
        },
        error: () => {
          this.error = 'Ошибка загрузки данных';
        }
      });
  }
}


