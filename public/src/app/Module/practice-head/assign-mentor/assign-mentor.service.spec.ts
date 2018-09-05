import { TestBed, inject } from '@angular/core/testing';

import { AssignMentorService } from './assign-mentor.service';

describe('AssignMentorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignMentorService]
    });
  });

  it('should be created', inject([AssignMentorService], (service: AssignMentorService) => {
    expect(service).toBeTruthy();
  }));
});
