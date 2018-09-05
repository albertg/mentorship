import { TestBed, inject } from '@angular/core/testing';

import { PracticeListService } from './practice-list.service';

describe('PracticeListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PracticeListService]
    });
  });

  it('should be created', inject([PracticeListService], (service: PracticeListService) => {
    expect(service).toBeTruthy();
  }));
});
