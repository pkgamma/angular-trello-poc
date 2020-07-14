import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../shared/data.service';
import { Board, List, Item } from '../../shared/data';

import { Store } from '@ngrx/store';
import * as BoardActions from '../../state/board.actions';
import { Observable } from 'rxjs';
import { State } from '../../state/app.state';
import { getTestMessage, getBoards } from '../../state/board.reducer';

@Component({
  selector: 'poc-board-modify',
  templateUrl: './board-modify.component.html',
  styleUrls: ['./board-modify.component.css']
})
export class BoardModifyComponent implements OnInit {

  formGroup: FormGroup;

  /**
   * Constructor for dependency injection
   * @param dataService for getting next unique ID when creating new board
   * @param dialogRef for Angular Material dialog
   * @param data for Angular Material dialog
   * @param formBuilder for form input
   */
  constructor(    
    private store: Store<State>,
    private dataService: DataService,
    public dialogRef: MatDialogRef<BoardModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentTitle: string, operationMode: string },
    public formBuilder: FormBuilder
  ) { }

  /**
   * Called when popup modal pops up, and build `formGroup` according to operation mode (add or edit/delete)
   */
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

  /**
   * Called when user hits the submit button, in "add" mode (when currentBoard has no content), 
   * passes back a new board object with new UID and no content, in "edit" mode, 
   * passes back with new UID and current content unchanged
   */
  onSubmit() {
    this.dialogRef.close({ "title": this.formGroup.value.title, "id": this.dataService.getNextUniqueId()});
  }

  /**
   * Called when user click on cancel, passes back a "_cancel" signal to inform
   * parent component to not perform any action
   */
  onNoClick() {
    this.dialogRef.close({"title": "_cancel"});
  }

  /**
   * Called when user click on cancel, passes back a "_delete" signal to inform
   * parent component to remove this current object
   */
  onDeleteClick() {
    if (confirm('Are you sure you want to delete this?')) {
      this.dialogRef.close({"title": "_delete"});
    }
  }

}