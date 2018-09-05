import { TestBed, inject } from '@angular/core/testing';

import { AssignMenteeService } from './assign-mentee.service';

describe('AssignMenteeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignMenteeService]
    });
  });

  it('should be created', inject([AssignMenteeService], (service: AssignMenteeService) => {
    expect(service).toBeTruthy();
  }));
});
