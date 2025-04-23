import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFormComponentComponent } from './article-form-component.component';

describe('ArticleFormComponentComponent', () => {
  let component: ArticleFormComponentComponent;
  let fixture: ComponentFixture<ArticleFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
