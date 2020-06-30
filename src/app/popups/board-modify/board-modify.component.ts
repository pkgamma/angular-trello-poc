import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../shared/data.service';
import { Board, List, Item } from '../../shared/data';

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
    private dataService: DataService,
    public dialogRef: MatDialogRef<BoardModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentBoard: Board, operationMode: string },
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
        title: [this.data.currentBoard.title, Validators.required]
      });
    }

  }

  /**
   * Called when user hits the submit button, in "add" mode (when currentBoard has no content), 
   * passes back a new board object with new UID and no content, in "edit" mode, 
   * passes back with new UID and current content unchanged
   */
  onSubmit() {
    let id = this.dataService.getNextUniqueId();
    this.dialogRef.close({ "title": this.formGroup.value.title, "id": id, "content": this.data.currentBoard.content ? this.data.currentBoard.content : [] });
  }

  /**
   * Called when user click on cancel, passes back a "_cancel" signal to inform
   * parent component to not perform any action
   */
  onNoClick() {
    this.formGroup.patchValue({
      title: "_cancel",
    });
    this.dialogRef.close(this.formGroup.value);
  }

  /**
   * Called when user click on cancel, passes back a "_delete" signal to inform
   * parent component to remove this current object
   */
  onDeleteClick() {
    if (confirm('Are you sure you want to delete this?')) {
      this.formGroup.patchValue({
        title: "_delete",
      });
      this.dialogRef.close(this.formGroup.value);
 }

  }

}