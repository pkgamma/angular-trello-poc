import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators'

import { Board, List, Item } from './data'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentBoardId: number;
  currentBoardContent: List[];
  boards: Board[];
  errorMessage: string;

  getCurrentBoardId(): number {
    return this.currentBoardId;
  }
  setCurrentBoardId(id: number) {
    this.currentBoardId = id;
    // populate data for current board
    console.log('current board ID set as ' + this.currentBoardId)
    this.setCurrentBoardContent(id);
  }

  getCurrentBoardContent(): List[] {
    return this.currentBoardContent;
  }
  setCurrentBoardContent(id: number) {

    this.getBoards().subscribe({
      next: boards => {
        this.boards = boards;
      },
      error: err => this.errorMessage = err
    });

    for (let board of this.boards) {
      if (board.id == id) {
        this.currentBoardContent = board.content;
        console.log(this.currentBoardContent);
      }
    }

  }

  // HARD CODED METHOD (TEMP)
  // =================

  private URL = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = 'error: ${err.error.message}';
    } else {
      errorMessage = 'server return: ${err.status}, error: ${err.message}'
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
