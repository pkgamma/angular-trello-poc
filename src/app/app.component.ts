import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './shared/data.service';
import { Board, List, Item } from './shared/data';
import { BoardModifyComponent } from './popups/board-modify/board-modify.component';
import { ListModifyComponent } from './popups/list-modify/list-modify.component'
import { ItemModifyComponent } from './popups/item-modify/item-modify.component';

import { Store } from '@ngrx/store';
import * as BoardActions from './state/board.actions';
import { Observable } from 'rxjs';
import { State } from './state/app.state';
import { getBoards, getCurrentBoard, getCurrentBoardId, getCurrentBoardListTitles } from './state/board.reducer';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = "Trello POC";
  boards$: Observable<Board[]>;
  currentBoardId$: Observable<number>;
  currentBoard$: Observable<Board>;
  currentBoardListTitles$: Observable<string[]>;

  /**
   * Constructor for dependency injection
   * @param dialog for edit/add function popups
   */
  constructor(
    private store: Store<State>,
    public dialog: MatDialog
  ) { }

  /**
   * Called once to get initial board data and set current board to -1 to trigger showing menu
   */
  ngOnInit() {
    this.store.dispatch(BoardActions.loadBoards());
    this.boards$ = this.store.select(getBoards);
    this.currentBoardId$ = this.store.select(getCurrentBoardId);
    this.currentBoard$ = this.store.select(getCurrentBoard);
    this.currentBoardListTitles$ = this.store.select(getCurrentBoardListTitles);
  }

  /**
   * Called when user click on a board, triggers `onBoardSwitch()`
   * @param id board id
   */
  onBoardSelect(id: number) {
    this.store.dispatch(BoardActions.setCurrentBoardId({ id: id }));
    this.store.dispatch(BoardActions.buildListTitlesArray());
  }

  /**
   * For dragging, dropping, and reordering lists
   * @param event 
   */
  onListDrop(event: CdkDragDrop<List[]>) {
    this.store.dispatch(BoardActions.swapLists({ currentIndex: event.currentIndex, previousIndex: event.previousIndex }));
  }

  /**
   * For dragging, dropping, and reordering items within or across lists
   * @param event 
   */
  onItemDrop(event: CdkDragDrop<Item[]>) {
    this.store.dispatch(BoardActions.swapItems({ list2Content: event.container.data, list1Content: event.previousContainer.data, currentIndex: event.currentIndex, previousIndex: event.previousIndex }));
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex);
    // }
  }

  /**
   * Called when user clicks on the add board button, opens up dialog, pass in data, 
   * wait for work done in the dialog component, then perform necessary work
   */
  onAddBoard() {
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: { currentTitle: "", operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") { this.store.dispatch(BoardActions.addBoard({ title: result.title, id: result.id })); };
    });
  }

  /**
   * Called when user clicks on the edit board button to edit or delete board, 
   * it opens up dialog, pass in data, wait for work done in the dialog component, 
   * then perform necessary work depending on user action in dialog component
   */
  onEditBoard(title: string) {
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: { currentTitle: title, operationMode: "edit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title == "_delete") { this.store.dispatch(BoardActions.deleteBoard()); }
      else if (result.title == "_cancel") { }
      else { this.store.dispatch(BoardActions.editBoard({ title: result.title })); };
    });
  }

  /**
   * Called when user clicks on the add list button, opens up dialog, pass in data, 
   * wait for work done in the dialog component, then perform necessary work
   */
  onAddList() {
    const dialogRef = this.dialog.open(ListModifyComponent, {
      data: { currentTitle: "", operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") {
        this.store.dispatch(BoardActions.addList({ title: result.title }));
        this.store.dispatch(BoardActions.buildListTitlesArray());
      };
    });
  }

  /**
   * Called when user clicks on the edit list button to edit or delete list, 
   * it opens up dialog, pass in data, wait for work done in the dialog component, 
   * then perform necessary work depending on user action in dialog component
   * @param currentList for getting current list title and content for edit
   */
  onEditList(currentList: List) {
    const dialogRef = this.dialog.open(ListModifyComponent, {
      data: { currentTitle: currentList.title, operationMode: "edit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title == "_delete") { this.store.dispatch(BoardActions.deleteList({ list: currentList })); }
      else if (result.title == "_cancel") { }
      else {
        this.store.dispatch(BoardActions.editList({ list: currentList, newTitle: result.title }));
        this.store.dispatch(BoardActions.buildListTitlesArray());
      };
    });
  }

  /**
   * Called when user clicks on the add item button, opens up dialog, pass in data, 
   * wait for work done in the dialog component, then perform necessary work
   * @param currentList for knowing which list to add the new item to
   */
  onAddItem(currentList: List) {
    const dialogRef = this.dialog.open(ItemModifyComponent, {
      data: { currentTitle: "", currentContent: "", operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") { this.store.dispatch(BoardActions.addItem({ list: currentList, title: result.title, content: result.content })); };
    });
  }

  /**
   * Called when user clicks on the edit item button to edit or delete item, 
   * it opens up dialog, pass in data, wait for work done in the dialog component, 
   * then perform necessary work depending on user action in dialog component
   * @param currentList for knowing which list to delete item from if user select delete
   * @param currentItem for getting current item data for edit
   */
  onEditItem(currentList: List, currentItem: Item) {
    const dialogRef = this.dialog.open(ItemModifyComponent, {
      data: { currentTitle: currentItem.title, currentContent: currentItem.content, operationMode: "edit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title == "_delete") { this.store.dispatch(BoardActions.deleteItem({ list: currentList, item: currentItem })); }
      else if (result.title == "_cancel") { }
      else { this.store.dispatch(BoardActions.editItem({ list: currentList, item: currentItem, title: result.title, content: result.content })); };
    });
  }

}
