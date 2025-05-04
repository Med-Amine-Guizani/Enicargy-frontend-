import { TestBed } from '@angular/core/testing';

import { EnicargyDashboardService } from '../services/enicargy-dashboard.service';

describe('EnicargyDashboardService', () => {
  let service: EnicargyDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnicargyDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
