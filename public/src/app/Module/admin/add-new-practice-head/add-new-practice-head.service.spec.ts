import { TestBed, inject } from '@angular/core/testing';

import { AddNewPracticeHeadService } from './add-new-practice-head.service';

describe('AddNewPracticeHeadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewPracticeHeadService]
    });
  });

  it('should be created', inject([AddNewPracticeHeadService], (service: AddNewPracticeHeadService) => {
    expect(service).toBeTruthy();
  }));
});
