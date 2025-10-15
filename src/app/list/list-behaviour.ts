import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
