import { TestBed, inject } from '@angular/core/testing';

import { AddPracticeService } from './add-practice.service';

describe('AddPracticeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddPracticeService]
    });
  });

  it('should be created', inject([AddPracticeService], (service: AddPracticeService) => {
    expect(service).toBeTruthy();
  }));
});
