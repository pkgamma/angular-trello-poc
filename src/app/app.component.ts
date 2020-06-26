import { Component } from '@angular/core';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  numbers: numbers[];
  
  constructor() {
    this.numbers = Array(5).fill(4); // [4,4,4,4,4]
  }

}
