import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators'

import { Board, List, Item } from './data'

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class DataService {

  boards: Board[];

  currentBoardId: number;
  currentBoardTitle: string;
  currentBoardContent: List[];

  private _boards: Board[] = require('./demoData.json');

  getBoards(): Board[] {
    return this._boards;
  }

  // getter for Board Title
  // ================================

  getCurrentBoardTitle(): string {
    return this.currentBoardTitle;
  }

  // getter & setter for Board ID
  // ================================

  getCurrentBoardId(): number {
    return this.currentBoardId;
  }

  setCurrentBoardId(id: number) {
    this.currentBoardId = id;
    console.log('current board ID set as ' + this.currentBoardId)
    // populate data for current board
    this.setCurrentBoardContent(id);
  }

  // getter & setter for Board Content
  // ================================

  getCurrentBoardContent(): List[] {
    return this.currentBoardContent;
  }

  setCurrentBoardContent(id: number) {
    this.boards = this.getBoards();

    for (let board of this.boards) {
      if (board.id == id) {
        this.currentBoardContent = board.content;
        console.log(this.currentBoardContent);
      }
    }
  }

  // BELOW IS THE ORIGINAL CODE FOR GETTING JSON THRU HTTP
  // =======================================================

  // private URL = 'assets/data.json';
  
  // constructor(private http: HttpClient) {
  // }

  // // get boards JSON object from URL
  // getBoards(): Observable<Board[]> {
  //   return this.http.get<Board[]>(this.URL).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // // error handling for HTTP
  // errorMessage: string;
  // private handleError(err: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (err.error instanceof ErrorEvent) {
  //     errorMessage = 'error: ${err.error.message}';
  //   } else {
  //     errorMessage = 'server return: ${err.status}, error: ${err.message}'
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }

}
