import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board, List, Item } from '../../data';

import { DataService } from '../../data.service';

import { SidebarComponent } from '../../sidebar/sidebar/sidebar.component';

export interface DialogData {
  newListName: string;
  newBoardName: string;
}

@Component({
  selector: 'poc-list-modify',
  templateUrl: './list-modify.component.html',
  styleUrls: ['./list-modify.component.css']
})
export class ListModifyComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<ListModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}