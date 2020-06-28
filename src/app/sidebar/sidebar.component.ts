import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board, List, Item } from '../shared/data';

import { DataService } from '../shared/data.service';

import { BoardModifyComponent } from '../popups/board-modify/board-modify.component';

@Component({
  selector: 'poc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() boardSwitched: EventEmitter<number> = new EventEmitter<number>();

  events: string[] = [];
  opened: boolean;

  newListName: string;
  newBoardName: string;

  currentBoardId: number;

  boards: Board[];
  errorMessage: string;

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.boards = this.dataService.getBoards();
  }

  onBoardSwitch(id: number) {
    this.dataService.setCurrentBoardId(id);
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.boardSwitched.emit(id);
  }

  openNewBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: { newBoardName: this.newBoardName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newBoardName = result;
      console.log('The board dialog was closed');
      console.log(this.newBoardName);
    });
  }

}