import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { DataService } from './shared/data.service';
import { Board, List, Item } from './shared/data';
import { ListModifyComponent } from './popups/list-modify/list-modify.component'
import { BoardModifyComponent } from './popups/board-modify/board-modify.component';
import { ItemModifyComponent } from './popups/item-modify/item-modify.component';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  boards: Board[];
  currentBoardId: number;
  currentBoardTitle: string;
  currentBoardContent: List[];
  currentBoardListTitles: string[];
  newListName: string;
  newBoardName: string;
  newItemName: string;
  newItemContent: string;

  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.onAppCompInit();
    this.dataService.setCurrentBoardId(-1);
    this.boards = this.dataService.getBoards();
    this.currentBoardId = this.dataService.getCurrentBoardId();
  }

  onBoardSelect(id: number) {
    this.dataService.setCurrentBoardId(id);
    this.onBoardSwitch();
  }

  onBoardSwitch() {
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.currentBoardTitle = this.dataService.getCurrentBoardTitle();
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
    if (this.currentBoardContent) {
      this.currentBoardListTitles = this.currentBoardContent.map(list => "" + list.title);
    }
  }

  onListDrop(event: CdkDragDrop<List[]>) {
    moveItemInArray(this.currentBoardContent, event.previousIndex, event.currentIndex);
  }

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

  onAddBoardButtonClick(): void {
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: { currentBoard: {}, operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") { this.boards.unshift(result); }
      console.log('The board dialog was closed');
      console.log(result);
    });
  }

  onEditBoardButtonClick() {
    let currentBoard = this.dataService.getCurrentBoard();
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: { currentBoard: currentBoard, operationMode: "edit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title == "_delete") { 
        this.boards.splice(this.boards.indexOf(currentBoard), 1);
        this.dataService.setCurrentBoardId(-1);
        this.onBoardSwitch();
      } else if (result.title == "_cancel") { 
      } else { 
        Object.assign(currentBoard, result);
        this.currentBoardTitle = result.title;
      };
      
      console.log('The board dialog was closed');
      console.log(result);
    });
  }

  onAddListButtonClick() {
    const dialogRef = this.dialog.open(ListModifyComponent, {
      data: { currentTitle: "", currentContent: [], operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") { this.currentBoardContent.unshift(result); };
      console.log('The list dialog was closed');
      console.log(result);
    });
  }

  onEditListButtonClick(currentList: List) {
    const dialogRef = this.dialog.open(ListModifyComponent, {
      data: { currentTitle: currentList.title, currentContent: currentList.content, operationMode: "edit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title == "_delete") { this.currentBoardContent.splice(this.currentBoardContent.indexOf(currentList), 1) }
      else if (result.title == "_cancel") { }
      else { Object.assign(currentList, result) };

      console.log('The list dialog was closed');
      console.log(result);
    });
  }

  onAddItemButtonClick(currentList: List): void {
    const dialogRef = this.dialog.open(ItemModifyComponent, {
      data: { currentTitle: "", currentContent: "", operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") { currentList.content.unshift(result); };
      console.log('The item dialog was closed');
      console.log(result);
    });
  }

  onEditItemButtonClick(currentList: List, currentItem: Item): void {
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
