import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRapportConsomationComponent } from './page-rapport-consomation.component';

describe('PageRapportConsomationComponent', () => {
  let component: PageRapportConsomationComponent;
  let fixture: ComponentFixture<PageRapportConsomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRapportConsomationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRapportConsomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
