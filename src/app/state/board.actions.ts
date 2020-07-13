import { createAction, props } from '@ngrx/store';
import { Board, List, Item } from '../shared/data'

export const testMessage = createAction(
    '[Test] Philips Test!'
)

export const setCurrentBoardId = createAction(
    '[Board] Set ID',
    props<{ id: number }>()
)

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
    props<{ title: string, id: number }>()
)

export const editBoard = createAction(
    '[Board] Edit',
    props<{ title: string }>()
)

export const deleteBoard = createAction(
    '[Board] Delete'
)

// list actions

export const addList = createAction(
    '[List] Add',
    props<{ title: string }>()
)

export const editList = createAction(
    '[List] Edit',
    props<{ list: List, newTitle: string }>()
)

export const deleteList = createAction(
    '[List] Delete',
    props<{ list: List }>()
)

// item actions

export const addItem = createAction(
    '[Item] Add',
    props<{ list: List, title: string }>()
)

export const editItem = createAction(
    '[Item] Edit',
    props<{ list: List, item: Item, title: string }>()
)

export const deleteItem = createAction(
    '[Item] Delete',
    props<{ list: List, item: Item }>()
)