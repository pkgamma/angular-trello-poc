import { Injectable } from '@angular/core';

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

  onAppCompInit() {
    this.boards = this.getBoards();
    console.log('onAppCompInit() called')
  }

  // getter and setter for Boards
  // ================================

  private _boards: Board[] = require('./demoData.json');

  getBoards(): Board[] {
    return this._boards;
  }

  // setBoards(URL: string) {
  //   this._boards = require(URL);
  //   this.onAppCompInit();
  // }

  // getter and setter for Board Title
  // ================================

  getCurrentBoardTitle(): string {
    return this.currentBoardTitle;
  }

  setCurrentBoardTitle(title: string) {
    this.currentBoardTitle = title;
  }

  // getter & setter for Board ID
  // ================================
  // an ID of -1 is home (no board selected)

  getCurrentBoardId(): number {
    return this.currentBoardId;
  }

  setCurrentBoardId(id: number) {
    this.currentBoardId = id;
    console.log('current board ID set as ' + this.currentBoardId + ', content:')
    // populate data for current board
    this.setCurrentBoardContent(id);
  }

  // getter & setter for Board Content
  // ================================

  getCurrentBoardContent(): List[] {
    return this.currentBoardContent;
  }

  setCurrentBoardContent(id: number) {
    if (id == -1) { this.currentBoardContent = null }
    for (let board of this.boards) {
      if (board.id == id) {
        this.currentBoardContent = board.content;
        this.setCurrentBoardTitle(board.title);
      }
    }
    console.log(this.currentBoardContent);
  }

  // BELOW IS THE ORIGINAL CODE FOR GETTING JSON THRU HTTP
  // =======================================================

  // private URL = './demoData.json';

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
