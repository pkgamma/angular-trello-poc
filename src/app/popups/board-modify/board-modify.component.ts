import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Board, List, Item } from '../../shared/data';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'poc-board-modify',
  templateUrl: './board-modify.component.html',
  styleUrls: ['./board-modify.component.css']
})
export class BoardModifyComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<BoardModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentBoard: Board, operationMode: string },
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.data.operationMode == "add") {
      this.formGroup = this.formBuilder.group({
        title: ["", Validators.required]
      });
    }
    if (this.data.operationMode == "edit") {
      this.formGroup = this.formBuilder.group({
        title: [this.data.currentBoard.title, Validators.required]
      });
    }

  }

  onSubmit() {
    let id = this.dataService.getNextUniqueId();
    this.dialogRef.close({ "title": this.formGroup.value.title, "id": id, "content": this.data.currentBoard.content });
  }

  onNoClick() {
    this.formGroup.patchValue({
      title: "_cancel",
    });
    this.dialogRef.close(this.formGroup.value);
  }

  onDeleteClick() {
    this.formGroup.patchValue({
      title: "_delete",
    });
    this.dialogRef.close(this.formGroup.value);
  }

}