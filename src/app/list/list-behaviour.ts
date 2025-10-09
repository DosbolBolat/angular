import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListBehaviour {
  readonly #listData$ = new BehaviorSubject<any[]>([]);

  get listData$() {
    return this.#listData$.asObservable();
  }

  get ListData() {
    return this.#listData$.value;
  }

  setListData(data: any) {
    this.#listData$.next(data);
  }
}
