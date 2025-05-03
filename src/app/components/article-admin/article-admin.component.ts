import { Component } from '@angular/core';
import {Input , Output, EventEmitter} from '@angular/core';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-admin.component.html',
  styleUrl: './article-admin.component.css'
})
export class ArticleAdminComponent {
  @Input() article!: Article;
  @Output() onEdit = new EventEmitter<Article>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onCancelEdit = new EventEmitter<void>();
  
  editMode = false;
  editedArticle: Article = { id: 0, title: '', body: '' };
  
  handleVoirPlus() {}

  
  
  startEdit() {
    this.editMode = true;
    // Create a copy of the article to avoid direct mutation
    this.editedArticle = { ...this.article };
  }
  
  cancelEdit() {
    this.editMode = false;
    this.onCancelEdit.emit();
  }
  
  saveEdit() {
    if (this.isValid()) {
      this.onEdit.emit(this.editedArticle);
      this.editMode = false;
    }
  }
  
  isValid(): boolean {
    return !!this.editedArticle.title?.trim() && !!this.editedArticle.body?.trim();
  }
}
