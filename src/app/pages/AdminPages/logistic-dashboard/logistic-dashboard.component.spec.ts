import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticDashboardComponent } from './logistic-dashboard.component';

describe('LogisticDashboardComponent', () => {
  let component: LogisticDashboardComponent;
  let fixture: ComponentFixture<LogisticDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
