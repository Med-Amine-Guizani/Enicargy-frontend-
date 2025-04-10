import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReclamationsComponent } from './page-reclamations.component';

describe('PageReclamationsComponent', () => {
  let component: PageReclamationsComponent;
  let fixture: ComponentFixture<PageReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageReclamationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
