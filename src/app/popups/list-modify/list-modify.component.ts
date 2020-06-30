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
    @Inject(MAT_DIALOG_DATA) public data: {newListName: string},
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        title: ["", Validators.required]
      });
    
  }

  onSubmit() {
    this.dialogRef.close({"title": this.formGroup.value.title, "content": []});
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

}