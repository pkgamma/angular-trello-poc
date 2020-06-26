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
    const boards = this.getBoards();
    for (let board of boards) {
      if (board.id == id) {
        this.currentBoardContent = board.content;
        console.log(this.currentBoardContent);
      }
    }
  }

  // HARD CODED METHOD (TEMP)
  // =================

  getBoards(): Board[] {
    return [
      {
        "title": "Board 1",
        "id": 1,
        "content": [
          {
            "title": "List 1",
            "id": 1,
            "content": [
              {
                "title": "Item 1",
                "id": 1,
                "content": "Task Number 1"
              },
              {
                "title": "Item 2",
                "id": 2,
                "content": "Task Number 2"
              },
              {
                "title": "Item 3",
                "id": 3,
                "content": "Task Number 3"
              }
            ]
          },
          {
            "title": "List 2",
            "id": 2,
            "content": [
              {
                "title": "Item 1",
                "id": 1,
                "content": "Task Number 1"
              },
              {
                "title": "Item 2",
                "id": 2,
                "content": "Task Number 2"
              }
            ]
          }
        ]
      },
      {
        "title": "Board 2",
        "id": 2,
        "content": [
          {
            "title": "List 1",
            "id": 1,
            "content": [
              {
                "title": "Item 1",
                "id": 1,
                "content": "Task Number 1"
              },
              {
                "title": "Item 2",
                "id": 2,
                "content": "Task Number 2"
              },
              {
                "title": "Item 3",
                "id": 3,
                "content": "Task Number 3"
              },
              {
                "title": "Item 4",
                "id": 4,
                "content": "Task Number 3"
              },
              {
                "title": "Item 5",
                "id": 5,
                "content": "Task Number 3"
              }
            ]
          },
          {
            "title": "List 2",
            "id": 2,
            "content": [
              {
                "title": "Item 1",
                "id": 1,
                "content": "Task Number 1"
              },
              {
                "title": "Item 2",
                "id": 2,
                "content": "Task Number 2"
              }
            ]
          }
        ]
      }
    ];
  }

  getListsByBoardId(boardId: number): List[] {
    return [
      {
        "title": "List 1",
        "id": 1,
        "content": [
          {
            "title": "Item 1",
            "id": 1,
            "content": "Task Number 1"
          },
          {
            "title": "Item 2",
            "id": 2,
            "content": "Task Number 2"
          },
          {
            "title": "Item 3",
            "id": 3,
            "content": "Task Number 3"
          }
        ]
      },
      {
        "title": "List 2",
        "id": 2,
        "content": [
          {
            "title": "Item 1",
            "id": 1,
            "content": "Task Number 1"
          },
          {
            "title": "Item 2",
            "id": 2,
            "content": "Task Number 2"
          }
        ]
      }
    ];
  }

  getItemsByBoardIdListId(boardId: number, listId: number): Item[] {
    return [
      {
        "title": "Item 1",
        "id": 1,
        "content": "Task Number 1"
      },
      {
        "title": "Item 2",
        "id": 2,
        "content": "Task Number 2"
      },
      {
        "title": "Item 3",
        "id": 3,
        "content": "Task Number 3"
      },
      {
        "title": "Item 4",
        "id": 4,
        "content": "Task Number 3"
      },
      {
        "title": "Item 5",
        "id": 5,
        "content": "Task Number 3"
      }
    ];
  }

  // NONE HTTP METHOD (NOT WORKING)
  // =================

  // constructor() { }

  // private appData: Board[] = require('api/data.json');

  // getBoards(): Board[] {
  //   return this.appData;
  // }

  // getListsByBoardId(boardId: number): List[] {
  //   return this.appData.find(x.content => x.id === boardId);
  // }

  // getItemsByBoardIdListId(boardId: number, listId: number): Item[] {
  //   return this.appData;
  // }

  // HTTP METHOD (NOT WORKING)
  // =================

  // private appData = 'api/data.json';

  // constructor(private http: HttpClient) { }

  // getBoards(): Observable<Board[]> {
  //     return this.http.get<Board[]>(this.appData).pipe(
  //         catchError(this.handleError)
  //     );
  // }

  // getListsByBoardId(boardId: number): Observable<Board | undefined> {
  //     return this.getBoards()
  //         .pipe(
  //             map((products: Board[]) => products.find(p => p.id === boardId))
  //         );
  // }

  // private handleError(err: HttpErrorResponse) {
  //     let errorMessage = '';

  //     if (err.error instanceof ErrorEvent) {
  //         errorMessage = 'error: ${err.error.message}';
  //     } else {
  //         errorMessage = 'server return: ${err.status}, error: ${err.message}'
  //     }

  //     console.error(errorMessage);
  //     return throwError(errorMessage);
  // }

}
