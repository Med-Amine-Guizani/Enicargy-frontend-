import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-article-form-component',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './article-form-component.component.html',
  styleUrl: './article-form-component.component.css'
})
export class ArticleFormComponentComponent {

  @Input() article: Article | null = null;
  @Output() save = new EventEmitter<Article>();
  @Output() cancel = new EventEmitter<void>();

  formArticle: Article = {
    id: 0,
    title: '',
    text: ''
  };

  isNew = true;

  ngOnInit() {
    if (this.article) {
      this.formArticle = { ...this.article };
      this.isNew = false;
    } else {
      // Default values for new article
      this.formArticle = {
        id: 0,  // Will be set by the backend
        title: '',
        text: ''
      };
      this.isNew = true;
    }
  }

  onSubmit() {
    if (this.isValid()) {
      this.save.emit(this.formArticle);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  isValid(): boolean {
    return !!this.formArticle.title?.trim() && !!this.formArticle.text?.trim();
  }

}
