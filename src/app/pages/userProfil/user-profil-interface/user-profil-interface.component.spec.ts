import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilInterfaceComponent } from './user-profil-interface.component';

describe('UserProfilInterfaceComponent', () => {
  let component: UserProfilInterfaceComponent;
  let fixture: ComponentFixture<UserProfilInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
