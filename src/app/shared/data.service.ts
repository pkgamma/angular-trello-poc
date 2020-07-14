import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Board, List, Item } from './data'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private httpURL = 'assets/demoData.json';

  constructor(private http: HttpClient) { }

  getBoardsHTTP(): Observable<Board[]> {
    console.log("getBoardsHTTP");
    return this.http.get<Board[]>(this.httpURL)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
