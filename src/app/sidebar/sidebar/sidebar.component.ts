import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  newListName: string;
  newBoardName: string;
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
  newBoardName: string;

  constructor(public dialog: MatDialog) { }

  openNewListDialog(): void {
    const dialogRef = this.dialog.open(AddListComponent, {
      data: { newListName: this.newListName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newListName = result;
      console.log('The list dialog was closed');
      console.log(this.newListName);
    });
  }

  openNewBoardDialog(): void {
    const dialogRef = this.dialog.open(AddBoardComponent, {
      data: { newBoardName: this.newBoardName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newBoardName = result;
      console.log('The board dialog was closed');
      console.log(this.newBoardName);
    });
  }

}

@Component({
  selector: 'poc-sidebar-add-list',
  templateUrl: './sidebar.add-list.component.html',
})
export class AddListComponent {

  constructor(
    public dialogRef: MatDialogRef<AddListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'poc-sidebar-add-board',
  templateUrl: './sidebar.add-board.component.html',
})
export class AddBoardComponent {

  constructor(
    public dialogRef: MatDialogRef<AddBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}