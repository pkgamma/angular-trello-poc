import { createReducer, createFeatureSelector, createSelector, on } from '@ngrx/store';
import { Board, List, Item } from '../shared/data'
import * as BoardActions from './board.actions';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface BoardState {
    currentBoardId: number | null;
    currentBoardListTitles: string[];
    boards: Board[];
    error: string;
}

const initialState: BoardState = {
    currentBoardId: -1,
    currentBoardListTitles: [],
    boards: [],
    error: ''
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

export const getCurrentBoardListTitles = createSelector(
    getBoardFeatureState,
    state => state.currentBoardListTitles
)

export const getBoards = createSelector(
    getBoardFeatureState,
    state => state.boards
)

export const getError = createSelector(
    getBoardFeatureState,
    state => state.error
)

// ===============================================

export const boardReducer = createReducer<BoardState>(
    initialState,

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
            currentBoardId: -1,
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

    on(BoardActions.buildListTitlesArray, (state) => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedBoardListTitles = currentBoard.content.map(l => "" + l.title);
        return {
            ...state,
            currentBoardListTitles: updatedBoardListTitles
        }
    }),

    on(BoardActions.swapLists, (state, action) => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedBoardContent = currentBoard.content.slice();
        moveItemInArray(updatedBoardContent, action.previousIndex, action.currentIndex);
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        }
    }),

    // item actions

    on(BoardActions.addItem, (state, action): BoardState => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedListContent = action.list.content.concat({ title: action.title, content: action.content });
        const updatedBoardContent = currentBoard.content.map(l => action.list === l ? { ...action.list, content: updatedListContent } : l);
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        };
    }),

    on(BoardActions.editItem, (state, action): BoardState => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        const updatedListContent = action.list.content.map(i => action.item === i ? { ...action.item, title: action.title, content: action.content } : i);
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

    on(BoardActions.swapItems, (state, action) => {
        const currentBoard = state.boards.find(b => b.id === state.currentBoardId);
        let list2Order = 0;
        let list1Order = 0;
        currentBoard.content.forEach(function (arrayItem) {
            if (arrayItem.content == action.list2Content) {
                list2Order = currentBoard.content.indexOf(arrayItem);
            }
            if (arrayItem.content == action.list1Content) {
                list1Order = currentBoard.content.indexOf(arrayItem);
            }
        });
        const list2Content = currentBoard.content[list2Order].content.slice();
        const list1Content = currentBoard.content[list1Order].content.slice();
        if (list1Content == list2Content) {
            moveItemInArray(list2Content, action.previousIndex, action.currentIndex);
        } else {
            transferArrayItem(list1Content, list2Content, action.previousIndex, action.currentIndex);
        }
        const updatedList2 = {...currentBoard.content[list2Order], content: list2Content}
        const updatedList1 = {...currentBoard.content[list1Order], content: list1Content}
        const updatedBoardContent = currentBoard.content.slice();
        updatedBoardContent[list2Order] = updatedList2;
        updatedBoardContent[list1Order] = updatedList1;
        const updatedBoards = state.boards.map(b => state.currentBoardId === b.id ? { ...b, content: updatedBoardContent } : b);
        return {
            ...state,
            boards: updatedBoards
        }
    }),

);