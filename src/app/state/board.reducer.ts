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

    on(BoardActions.setCurrentBoardId, (state, action): BoardState => {
        return {
            ...state,
            currentBoardId: action.id
        };
    }),

    // load boards

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

    // board actions

    on(BoardActions.addBoard, (state, action): BoardState => {
        const updatedBoards = state.boards.concat({ title: action.title, id: action.id, content: [] });
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    on(BoardActions.editBoard, (state, action): BoardState => {
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, title: action.title } : b);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    on(BoardActions.deleteBoard, (state): BoardState => {
        const updatedBoards = state.boards.filter(b => state.currentBoardId !== b.id);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    // list actions

    on(BoardActions.addList, (state, action): BoardState => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedBoardContent = currentBoard.content.concat({ title: action.title, content: [] });
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    on(BoardActions.editList, (state, action): BoardState => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedBoardContent = currentBoard.content.map(l => action.list === l ? { ...action.list, title: action.newTitle } : l);
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    on(BoardActions.deleteList, (state, action): BoardState => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedBoardContent = currentBoard.content.filter(l => l !== action.list);
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    // item actions

    on(BoardActions.addItem, (state, action): BoardState => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedListContent = action.list.content.concat({ title: action.title, content: "" });
        const updatedBoardContent = currentBoard.content.map(l => action.list === l ? { ...action.list, content: updatedListContent } : l);
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    on(BoardActions.editItem, (state, action): BoardState => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedListContent = action.list.content.map(i => action.item === i ? { ...action.item, title: action.title } : i);
        const updatedBoardContent = currentBoard.content.map(l => action.list === l ? { ...action.list, content: updatedListContent } : l);
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    on(BoardActions.deleteItem, (state, action): BoardState => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedListContent = action.list.content.filter(i => i !== action.item);
        const updatedBoardContent = currentBoard.content.map(l => action.list === l ? { ...action.list, content: updatedListContent } : l);
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

);