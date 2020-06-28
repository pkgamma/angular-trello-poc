import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModifyComponent } from './board-modify.component';

describe('BoardModifyComponent', () => {
  let component: BoardModifyComponent;
  let fixture: ComponentFixture<BoardModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
