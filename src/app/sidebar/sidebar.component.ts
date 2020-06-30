import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DataService } from '../shared/data.service';
import { Board, List, Item } from '../shared/data';

import { BoardModifyComponent } from '../popups/board-modify/board-modify.component';

@Component({
  selector: 'poc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() boardSwitched: EventEmitter<number> = new EventEmitter<number>();

  boards: Board[];
  currentBoardId: number;

  newBoardName: string;

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    this.boards = this.dataService.getBoards();
    this.currentBoardId = this.dataService.getCurrentBoardId();
  }

  onBoardSwitch(id: number) {
    this.dataService.setCurrentBoardId(id);
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.boardSwitched.emit(id);
  }

  onAddBoard(): void {
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: {currentBoard: {}, operationMode: "add"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") {this.boards.unshift(result);}
      console.log('The board dialog was closed');
      console.log(result);
    });
  }

}