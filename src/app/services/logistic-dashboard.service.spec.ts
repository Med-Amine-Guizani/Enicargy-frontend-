import { TestBed } from '@angular/core/testing';

import { LogisticDashboardService } from './logistic-dashboard.service';

describe('LogisticDashboardService', () => {
  let service: LogisticDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogisticDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
