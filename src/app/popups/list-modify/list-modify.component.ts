import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Board, List, Item } from '../../shared/data';

export interface DialogData {
  newListName: string;
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