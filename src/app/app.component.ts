import { Component, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
  }

  onRefresh() {
    this.currentBoardContent = this.dataService.getCurrentBoardContent();
  }

  // getBoardsList(boardNum: number): string[] {
  //   for (let board of this.boards) {
  //     console.log(board.title);
  //   }
  //   return;
  // }


  numbers: number[] = [1, 2, 3, 4, 5];

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
