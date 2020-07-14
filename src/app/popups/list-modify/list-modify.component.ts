import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'poc-list-modify',
  templateUrl: './list-modify.component.html',
  styleUrls: ['./list-modify.component.css']
})
export class ListModifyComponent implements OnInit {

  formGroup: FormGroup;

  /**
   * Constructor for dependency injection
   * @param dialogRef for Angular Material dialog
   * @param data for Angular Material dialog
   * @param formBuilder for form input
   */
  constructor(
    public dialogRef: MatDialogRef<ListModifyComponent>,
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
   * Called when user hits the submit button, in "add" mode, passes back a new list object
   * with no content, in "edit" mode, passes back with current content unchanged
   */
  onSubmit() {
    this.dialogRef.close({ "title": this.formGroup.value.title });
  }

  /**
   * Called when user click on cancel, passes back a "_cancel" signal to inform
   * parent component to not perform any action
   */
  onNoClick() {
    this.dialogRef.close({ "title": "_cancel" });
  }

  /**
   * Called when user click on cancel, passes back a "_delete" signal to inform
   * parent component to remove this current object
   */
  onDeleteClick() {
    if (confirm('Are you sure you want to delete this?')) {
      this.dialogRef.close({ "title": "_delete" });
    }
  }

}