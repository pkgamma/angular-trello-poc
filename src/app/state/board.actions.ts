import { createAction, props } from '@ngrx/store';
import { Board, List, Item } from '../shared/data'

export const testMessage = createAction(
    '[Test] Philips Test!'
)

export const setCurrentBoardToMenu = createAction(
    '[Board] Set ID to -1 (Menu)'
);

// load boards

export const loadBoards = createAction(
    '[Load Board] Load'
)

export const loadBoardsSuccess = createAction(
    '[Load Board] Load Success',
    props<{ boards: Board[] }>()
)

export const loadBoardsFailure = createAction(
    '[Load Board] Load Fail',
    props<{ error: string }>()
)

// board actions

export const addBoard = createAction(
    '[Board] Add',
    props<{ board: Board }>()
)

export const editBoard = createAction(
    '[Board] Edit',
    props<{ board: Board }>()
)

export const deleteBoard = createAction(
    '[Board] Delete'
)

// list

export const addList = createAction(
    '[List] Add',
    props<{ list: List }>()
)

export const editList = createAction(
    '[List] Edit',
    props<{ list: List }>()
)

export const deleteList = createAction(
    '[List] Delete'
)

// item

export const addItem = createAction(
    '[Item] Add',
    props<{ item: Item }>()
)

export const editItem = createAction(
    '[Item] Edit',
    props<{ item: Item }>()
)

export const deleteItem = createAction(
    '[Item] Delete'
)