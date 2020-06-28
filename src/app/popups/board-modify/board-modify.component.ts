import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board, List, Item } from '../../shared/data';

import { DataService } from '../../shared/data.service';

import { SidebarComponent } from '../../sidebar/sidebar.component';

export interface DialogData {
  newBoardName: string;
}

@Component({
  selector: 'poc-board-modify',
  templateUrl: './board-modify.component.html',
  styleUrls: ['./board-modify.component.css']
})
export class BoardModifyComponent implements OnInit {

  ngOnInit(): void {
  }
  
  constructor(
    public dialogRef: MatDialogRef<BoardModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}