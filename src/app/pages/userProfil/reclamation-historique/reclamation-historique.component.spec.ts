import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationHistoriqueComponent } from './reclamation-historique.component';

describe('ReclamationHistoriqueComponent', () => {
  let component: ReclamationHistoriqueComponent;
  let fixture: ComponentFixture<ReclamationHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationHistoriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
