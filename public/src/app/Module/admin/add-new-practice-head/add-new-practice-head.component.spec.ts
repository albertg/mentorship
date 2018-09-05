import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPracticeHeadComponent } from './add-new-practice-head.component';

describe('AddNewPracticeHeadComponent', () => {
  let component: AddNewPracticeHeadComponent;
  let fixture: ComponentFixture<AddNewPracticeHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPracticeHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPracticeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
