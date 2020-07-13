import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../shared/data.service';
import { Board, List, Item } from '../shared/data';
import { BoardModifyComponent } from '../popups/board-modify/board-modify.component';

import { Store } from '@ngrx/store';
import * as BoardActions from '../state/board.actions';
import { Observable } from 'rxjs';
import { State } from '../state/app.state';
import { getTestMessage, getBoards } from '../state/board.reducer';

@Component({
  selector: 'poc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() boardSwitched: EventEmitter<number> = new EventEmitter<number>();

  // boards: Board[];

  boards$: Observable<Board[]>;

  /**
   * Constructor for dependency injection
   * @param dataService for getting board data
   * @param dialog for edit/add function popups
   */
  constructor(
    private store: Store<State>,
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  /**
   * Called once to get initial board data (id will be -1 as set in app component)
   */
  ngOnInit() {
    // this.boards = this.dataService.getBoards();
    this.boards$ = this.store.select(getBoards);
  }

  /**
   * Called when user click on a board, passes event back to app component
   * @param id board id
   */
  onBoardSelect(id: number) {
    // this.dataService.setCurrentBoardId(id);
    this.store.dispatch(BoardActions.setCurrentBoardId({ id: id }));
    this.boardSwitched.emit(id);
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
      if (result.title != "_cancel") {
        this.store.dispatch(BoardActions.addBoard({ title: result.title, id: result.id }));
      }
      console.log('The board dialog was closed');
      console.log(result);
    });
  }

}