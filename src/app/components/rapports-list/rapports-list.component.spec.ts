import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsListComponent } from './rapports-list.component';

describe('RapportsListComponent', () => {
  let component: RapportsListComponent;
  let fixture: ComponentFixture<RapportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
