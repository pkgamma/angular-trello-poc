import { createReducer, createFeatureSelector, createSelector, on } from '@ngrx/store';
import { Board, List, Item } from '../shared/data'
import * as BoardActions from './board.actions';

export interface BoardState {
    currentBoardId: number | null;
    boards: Board[];
    error: string;
    testMessage: string;
}

const initialState: BoardState = {
    currentBoardId: -1,
    boards: [],
    error: '',
    testMessage: 'from board reducer interface'
}

// ===============================================

const getBoardFeatureState = createFeatureSelector<BoardState>('boards');

export const getCurrentBoardId = createSelector(
    getBoardFeatureState,
    state => state.currentBoardId
)

export const getCurrentBoard = createSelector(
    getBoardFeatureState,
    getCurrentBoardId,
    (state, currentBoardId) => {
        return currentBoardId ? state.boards.find(b => b.id === currentBoardId) : null
    }
)

export const getBoards = createSelector(
    getBoardFeatureState,
    state => state.boards
)

export const getError = createSelector(
    getBoardFeatureState,
    state => state.error
)

export const getTestMessage = createSelector(
    getBoardFeatureState,
    state => state.testMessage
)

// ===============================================

export const boardReducer = createReducer<BoardState>(
    initialState,

    on(BoardActions.testMessage, (state): BoardState => {
        return {
            ...state,
            testMessage: 'CALLIN FROM BOARD REDUCER'
        }
    }),

    on(BoardActions.setCurrentBoardToMenu, (state): BoardState => {
        return {
            ...state,
            currentBoardId: -1
        };
    }),

    on(BoardActions.loadBoardsSuccess, (state, action): BoardState => {
        return {
            ...state,
            boards: action.boards,
            error: ''
        }
    }),

    on(BoardActions.loadBoardsFailure, (state, action): BoardState => {
        return {
            ...state,
            boards: [],
            error: action.error
        }
    }),

);