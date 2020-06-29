import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Board, List, Item } from '../../shared/data';

@Component({
  selector: 'poc-item-modify',
  templateUrl: './item-modify.component.html',
  styleUrls: ['./item-modify.component.css']
})
export class ItemModifyComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ItemModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {operationMode: string},
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.data.operationMode == "add") {
      this.formGroup = this.formBuilder.group({
        title: ["", Validators.required],
        content: [""]
      });
    }
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

}