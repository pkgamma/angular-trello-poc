import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Board, List, Item } from '../shared/data';
import { BoardModifyComponent } from '../popups/board-modify/board-modify.component';
import { State } from '../state/app.state';
import { getBoards } from '../state/board.reducer';
import * as BoardActions from '../state/board.actions';

@Component({
  selector: 'poc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  boards$: Observable<Board[]>;

  /**
   * Constructor for dependency injection
   * @param dataService for getting board data
   * @param dialog for edit/add function popups
   */
  constructor(
    private store: Store<State>,
    public dialog: MatDialog
  ) { }

  /**
   * Called once to get initial board data (id will be -1 as set in app component)
   */
  ngOnInit() {
    this.boards$ = this.store.select(getBoards);
  }

  /**
   * Called when user click on a board, passes event back to app component
   * @param id board id
   */
  onBoardSelect(id: number) {
    this.store.dispatch(BoardActions.setCurrentBoardId({ id: id }));
  }

  /**
   * Called when user clicks on the add board button, opens up dialog, pass in data, 
   * wait for work done in the dialog component, then perform necessary work
   */
  onAddBoard() {
    const dialogRef = this.dialog.open(BoardModifyComponent, {
      data: { currentBoard: {}, operationMode: "add" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.title != "_cancel") {this.store.dispatch(BoardActions.addBoard({ title: result.title, id: result.id }));};
    });
  }

}