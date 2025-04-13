import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnicargyDashboardComponent } from './enicargy-dashboard.component';

describe('EnicargyDashboardComponent', () => {
  let component: EnicargyDashboardComponent;
  let fixture: ComponentFixture<EnicargyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnicargyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnicargyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
