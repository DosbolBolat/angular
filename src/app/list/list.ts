import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class ListComponent implements OnInit, OnDestroy {
  loading = false;
  error = '';
  private subscription?: Subscription;

  allPokemon: any[] = [];  
  listBehaviour = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=100')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          this.allPokemon = res.results;
          this.listBehaviour.next(this.allPokemon);
        },
        error: () => {
          this.error = 'Ошибка загрузки';
        }
      });
  }

  onSearch(query: string) {
    const text = query.toLowerCase().trim();
    if (text === '') {
      this.listBehaviour.next(this.allPokemon);
    } else {
      this.listBehaviour.next(
        this.allPokemon.filter(p => p.name.toLowerCase().includes(text))
      );
    }
  }
}
