import { Component } from '@angular/core';
import { Article} from '../../../models/article';
import { CommonModule } from '@angular/common';
import { ArticleAdminComponent } from '../../../components/article-admin/article-admin.component';
import { ArticleService } from '../../../services/article.service';
import { ArticleFormComponentComponent } from '../../../components/article-form-component/article-form-component.component';
@Component({
  selector: 'app-page-article',
  standalone: true,
  imports: [CommonModule,ArticleAdminComponent,ArticleFormComponentComponent],
  templateUrl: './page-article.component.html',
  styleUrl: './page-article.component.css'
})
export class PageArticleComponent {
  articles: any[] = [];
  loading = false;
  showAddForm = false;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.loading = true;
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading articles:', error);
        this.loading = false;
      }
    });
  }

  handleEdit(updatedArticle: Article): void {
    this.loading = true;
    this.articleService.updateArticle(updatedArticle).subscribe({
      next: (response) => {
        // Update the article in the local array
        const index = this.articles.findIndex(a => a.id === updatedArticle.id);
        if (index !== -1) {
          this.articles[index] = response || updatedArticle;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error updating article:', error);
        this.loading = false;
      }
    });
  }

  handleDelete(articleId: number): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.loading = true;
      this.articleService.deleteArticle(articleId).subscribe({
        next: () => {
          // Remove the article from the local array
          this.articles = this.articles.filter(a => a.id !== articleId);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error deleting article:', error);
          this.loading = false;
        }
      });
    }
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  cancelAddForm(): void {
    this.showAddForm = false;
  }

  saveNewArticle(newArticle: Article): void {
    this.loading = true;
    
    
    setTimeout(() => {
     
      const maxId = this.articles.length > 0 
        ? Math.max(...this.articles.map(a => a.id)) 
        : 0;
      
      const savedArticle = { 
        ...newArticle,
        id: maxId + 1
      };
      
      // Add to the articles array
      this.articles.push(savedArticle);
      // Create a new array reference to trigger change detection
      this.articles = [...this.articles];
      
      this.showAddForm = false; // Close the form
      this.loading = false;
      
      console.log('New article added:', savedArticle);
    }, 500); // Simulate network delay
  }

  
}
