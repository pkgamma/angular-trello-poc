import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './shared/data.service';
import { Board, List, Item } from './shared/data';
import { BoardModifyComponent } from './popups/board-modify/board-modify.component';
import { ListModifyComponent } from './popups/list-modify/list-modify.component'
import { ItemModifyComponent } from './popups/item-modify/item-modify.component';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = "Trello POC";

  boards: Board[];
  currentBoardId: number;
  currentBoardTitle: string;
  currentBoardContent: List[];
  currentBoardListTitles: string[];

  /**
   * Constructor for dependency injection
   * @param dataService for getting board data
   * @param dialog for edit/add function popups
   */
  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  /**
   * Called once to get initial board data and set current board to -1 to trigger showing menu
   */
  ngOnInit() {
    this.dataService.onAppCompInit();
    this.dataService.setCurrentBoardId(-1);
    this.boards = this.dataService.getBoards();
    this.currentBoardId = this.dataService.getCurrentBoardId();
  }

  /**
   * Called when user click on a board, triggers `onBoardSwitch()`
   * @param id board id
   */
  onBoardSelect(id: number) {
    this.dataService.setCurrentBoardId(id);
    this.onBoardSwitch();
  }

  /**
   * Called when board switches either by this or the sidebar component, update all local copy of data
   */
  onBoardSwitch() {
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.currentBoardTitle = this.dataService.getCurrentBoardTitle();
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
    if (this.currentBoardContent) {
      this.currentBoardListTitles = this.currentBoardContent.map(list => "" + list.title);
    }
  }

  /**
   * For dragging, dropping, and reordering lists
   * @param event 
   */
  onListDrop(event: CdkDragDrop<List[]>) {
    moveItemInArray(this.currentBoardContent, event.previousIndex, event.currentIndex);
  }

  /**
   * For dragging, dropping, and reordering items within or across lists
   * @param event 
   */
  onItemDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /**
   * Called when user clicks on the add board button, opens up dialog, pass in data, 
   * wait for work done in the dialog component, then perform necessary work
   */
  onAddBoard() {
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: { currentBoard: {}, operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") { this.boards.unshift(result); }
      console.log('The board dialog was closed');
      console.log(result);
    });
  }

  /**
   * Called when user clicks on the edit board button to edit or delete board, 
   * it opens up dialog, pass in data, wait for work done in the dialog component, 
   * then perform necessary work depending on user action in dialog component
   */
  onEditBoard() {
    let currentBoard = this.dataService.getCurrentBoard();
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: { currentBoard: currentBoard, operationMode: "edit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title == "_delete") {
        this.boards.splice(this.boards.indexOf(currentBoard), 1);
        this.onBoardSelect(-1);
      } else if (result.title == "_cancel") {
      } else {
        Object.assign(currentBoard, result);
        this.currentBoardTitle = result.title;
      };

      console.log('The board dialog was closed');
      console.log(result);
    });
  }

  /**
   * Called when user clicks on the add list button, opens up dialog, pass in data, 
   * wait for work done in the dialog component, then perform necessary work
   */
  onAddList() {
    const dialogRef = this.dialog.open(ListModifyComponent, {
      data: { currentTitle: "", currentContent: [], operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") { this.currentBoardContent.unshift(result); };
      this.currentBoardListTitles = this.currentBoardContent.map(list => "" + list.title);
      console.log('The list dialog was closed');
      console.log(result);
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
      data: { currentTitle: currentList.title, currentContent: currentList.content, operationMode: "edit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title == "_delete") { this.currentBoardContent.splice(this.currentBoardContent.indexOf(currentList), 1) }
      else if (result.title == "_cancel") { }
      else { Object.assign(currentList, result) };
      this.currentBoardListTitles = this.currentBoardContent.map(list => "" + list.title);
      console.log('The list dialog was closed');
      console.log(result);
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
      if (result.title != "_cancel") { currentList.content.unshift(result); };
      console.log('The item dialog was closed');
      console.log(result);
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
      if (result.title == "_delete") { currentList.content.splice(currentList.content.indexOf(currentItem), 1) }
      else if (result.title == "_cancel") { }
      else { Object.assign(currentItem, result) };

      console.log('The item dialog was closed');
      console.log(result);
    });
  }

}
