import { Injectable } from '@angular/core';
import { Board, List, Item } from './data'

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class DataService {

  boards: Board[];
  currentBoard: Board;
  currentBoardId: number;
  currentBoardTitle: string;
  currentBoardContent: List[];

  private _boards: Board[] = require('./demoData.json');

  /**
   * Called once ever in app lifecycle by app component
   */
  onAppCompInit() {
    this.boards = this.getBoards();
    console.log('onAppCompInit() called')
  }

  /**
   * Returns array of all the board objects
   */
  getBoards(): Board[] {
    return this._boards;
  }

  /**
   * Generator for new board's ID, guaranteed to be unique
   */
  getNextUniqueId(): number {
    let id = 0;
    for (let board of this.boards) {
      if (board.id > id) {
        id = board.id;
      }
    }
    return id + 1;
  }

  /**
   * Returns current board object
   */
  getCurrentBoard(): Board {
    return this.currentBoard;
  }

  /**
   * Returns current board title
   */
  getCurrentBoardTitle(): string {
    return this.currentBoardTitle;
  }

  /**
   * Sets local board title based on string input
   * @param title input board title
   */
  setCurrentBoardTitle(title: string) {
    this.currentBoardTitle = title;
  }

  /**
   * Returns current board ID, an ID of -1 is menu (no board)
   */
  getCurrentBoardId(): number {
    return this.currentBoardId;
  }

  /**
   * Sets local board id based on ID input, then sets content as well
   * @param id input board id
   */
  setCurrentBoardId(id: number) {
    this.currentBoardId = id;
    console.log('current board ID set as ' + this.currentBoardId + ', content:')
    // populate data for current board
    this.setCurrentBoardContent(id);
  }

  /**
   * Returns current board content, also the array of lists
   */
  getCurrentBoardContent(): List[] {
    return this.currentBoardContent;
  }

  /**
   * Sets local board content based on ID input
   * @param id input board id
   */
  setCurrentBoardContent(id: number) {
    if (id == -1) { this.currentBoardContent = null }
    for (let board of this.boards) {
      if (board.id == id) {
        this.currentBoard = board;
        this.currentBoardContent = board.content;
        this.setCurrentBoardTitle(board.title);
      }
    }
    console.log(this.currentBoardContent);
  }

  // BELOW IS THE ORIGINAL CODE FOR GETTING JSON THRU HTTP
  // =======================================================

  // private URL = './demoData.json';
  // constructor(private http: HttpClient) { }

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
