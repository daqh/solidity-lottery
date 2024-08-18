import { TestBed } from '@angular/core/testing';

import { LotteryFactoryService } from './lottery-factory.service';

describe('LotteryFactoryService', () => {
  let service: LotteryFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotteryFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
