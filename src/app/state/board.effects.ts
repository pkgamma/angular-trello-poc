import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as BoardActions from './board.actions';
import { DataService } from '../shared/data.service';

@Injectable()
export class BoardEffects {

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ) {}

    loadBoards$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BoardActions.loadBoards),
            mergeMap(() => this.dataService.getBoardsHTTP().pipe(
                map(boards => BoardActions.loadBoardsSuccess({ boards })),
                catchError(error => of(BoardActions.loadBoardsFailure({ error })))
            ))
        )
    });
    
}