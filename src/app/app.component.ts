import { Component, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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

  currentBoardContent: List[];

  newListName: string;

  boards: Board[];
  errorMessage: string;

  currentBoardId: number;

  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.onAppCompInit();
    this.dataService.setCurrentBoardId(-1);
    this.boards = this.dataService.getBoards();
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
  }

  onCardClick(evt: MouseEvent){
    console.log(evt);
  }

  onAddListButton() {
    const dialogRef = this.dialog.open(ListModifyComponent, {
      data: { newListName: this.newListName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newListName = result;
      console.log('The list dialog was closed');
      console.log(this.newListName);
    });
  }

  onBoardSwitch(id: number) {
    this.dataService.setCurrentBoardId(id);
    this.onRefresh();
  }

  onRefresh() {
    // console.log("onRefresh")
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
