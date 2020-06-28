import { Component, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataService } from './data.service';
import { Board, List, Item } from './data';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentBoardContent: List[];
  
  boards: Board[];
  errorMessage: string;

  currentBoardId: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.setCurrentBoardId(-1);
    this.boards = this.dataService.getBoards();
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
  }

  onCardClick(evt: MouseEvent){
    console.log(evt);
  }

  onBoardSwitch(id: number) {
    this.dataService.setCurrentBoardId(id);
    this.onRefresh();
  }

  onRefresh() {
    // console.log("onRefresh")
    this.currentBoardId = this.dataService.getCurrentBoardId();
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
