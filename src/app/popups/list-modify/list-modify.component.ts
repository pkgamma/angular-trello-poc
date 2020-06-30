import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Board, List, Item } from '../../shared/data';

@Component({
  selector: 'poc-list-modify',
  templateUrl: './list-modify.component.html',
  styleUrls: ['./list-modify.component.css']
})
export class ListModifyComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ListModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentTitle: string, currentContent: Item[], operationMode: string },
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
        title: [this.data.currentTitle, Validators.required]
      });
    }
  }

  onSubmit() {
    if (this.data.operationMode == "add") {
      this.dialogRef.close({ "title": this.formGroup.value.title, "content": [] });
    }
    if (this.data.operationMode == "edit") {
      this.dialogRef.close({ "title": this.formGroup.value.title, "content": this.data.currentContent });
    }
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