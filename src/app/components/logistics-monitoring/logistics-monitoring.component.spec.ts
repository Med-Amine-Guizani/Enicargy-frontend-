import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsMonitoringComponent } from './logistics-monitoring.component';

describe('LogisticsMonitoringComponent', () => {
  let component: LogisticsMonitoringComponent;
  let fixture: ComponentFixture<LogisticsMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticsMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
