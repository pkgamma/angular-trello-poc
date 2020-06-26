import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  newListName: string;
}

@Component({
  selector: 'poc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  events: string[] = [];
  opened: boolean;

  newListName: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBoardComponent, {
      // height: '400px',
      // width: '600px',
      data: {newListName: this.newListName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newListName = result;
      console.log('The dialog was closed');
      console.log(this.newListName);
    });
  }

}

@Component({
  selector: 'poc-sidebar-add-board',
  templateUrl: './sidebar.add-board.component.html',
})
export class AddBoardComponent {

  constructor(
    public dialogRef: MatDialogRef<AddBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}