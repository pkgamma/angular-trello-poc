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
    @Inject(MAT_DIALOG_DATA) public data: {newBoardName: string},
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
        title: ["", Validators.required]
      });
    
  }

  onSubmit() {
    let id = this.dataService.getNextUniqueId();
    this.dialogRef.close({"title": this.formGroup.value.title, "id": id, "content": []});
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

}