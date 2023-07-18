/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotesbyuserComponent } from './notesbyuser.component';

describe('NotesbyuserComponent', () => {
  let component: NotesbyuserComponent;
  let fixture: ComponentFixture<NotesbyuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesbyuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
