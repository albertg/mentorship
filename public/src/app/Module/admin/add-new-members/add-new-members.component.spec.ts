import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMembersComponent } from './add-new-members.component';

describe('AddNewMembersComponent', () => {
  let component: AddNewMembersComponent;
  let fixture: ComponentFixture<AddNewMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
