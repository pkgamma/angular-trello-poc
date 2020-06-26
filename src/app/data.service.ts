import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators'

import { Board, List, Item } from './data'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  boards: Board[] = [];
  currentBoardId: number;
  currentBoardContent: List[];
  
  private URL = 'assets/data.json';

  errorMessage: string;
  loading: boolean = true;

  constructor(private http: HttpClient) {
  }

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
    this.loading = true
    this.getBoards().subscribe({
      next: boards => {
        this.boards = boards;
        console.log(boards);
        this.loading = false;
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

  // get boards JSON object from URL
  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.URL).pipe(
      catchError(this.handleError)
    );
  }

  // error handling for HTTP
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
