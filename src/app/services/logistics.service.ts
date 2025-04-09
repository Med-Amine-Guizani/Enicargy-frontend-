import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LogisticsService {
  constructor() {}

  getChairs(): Observable<number> {
    // Simulate API returning 42 chairs after 500ms
    return of(250).pipe(delay(500));
  }

  getDesks(): Observable<number> {
    return of(300).pipe(delay(700));
  }

  getProjectors(): Observable<number> {
    return of(20).pipe(delay(600));
  }
}
