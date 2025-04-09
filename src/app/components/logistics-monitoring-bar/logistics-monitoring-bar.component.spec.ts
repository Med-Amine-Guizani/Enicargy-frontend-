import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsMonitoringBarComponent } from './logistics-monitoring-bar.component';

describe('LogisticsMonitoringBarComponent', () => {
  let component: LogisticsMonitoringBarComponent;
  let fixture: ComponentFixture<LogisticsMonitoringBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticsMonitoringBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticsMonitoringBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
