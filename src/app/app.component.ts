import { Component, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from './shared/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board, List, Item } from './shared/data';

import { ListModifyComponent } from './popups/list-modify/list-modify.component'

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  boards: Board[];
  currentBoardId: number;
  currentBoardContent: List[];
  currentBoardListIds: string[];  
  newListName: string;

  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.onAppCompInit();
    this.dataService.setCurrentBoardId(-1);
    this.boards = this.dataService.getBoards();
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
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

  onBoardSelect(id: number) {
    this.dataService.setCurrentBoardId(id);
    this.onBoardSwitch();
  }

  onBoardSwitch() {
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
    this.currentBoardListIds = this.currentBoardContent.map(track => "" + track.id);
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

}
