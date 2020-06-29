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
      data: { newBoardName: this.newBoardName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newBoardName = result;
      console.log('The board dialog was closed');
      console.log(this.newBoardName);
    });
  }

  onAddListButtonClick() {
    const dialogRef = this.dialog.open(ListModifyComponent, {
      data: { newListName: this.newListName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newListName = result;
      console.log('The list dialog was closed');
      console.log(this.newListName);
    });
  }

  onAddItemButtonClick(currentList: List): void {
    const dialogRef = this.dialog.open(ItemModifyComponent, {
      data: {operationMode: "add"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {} else {currentList.content.unshift(result);}
      console.log('The item dialog was closed');
      console.log(result);
    });
  }

}
