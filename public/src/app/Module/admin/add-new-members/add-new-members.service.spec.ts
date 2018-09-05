import { TestBed, inject } from '@angular/core/testing';

import { AddNewMembersService } from './add-new-members.service';

describe('AddNewMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewMembersService]
    });
  });

  it('should be created', inject([AddNewMembersService], (service: AddNewMembersService) => {
    expect(service).toBeTruthy();
  }));
});
