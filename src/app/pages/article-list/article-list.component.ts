
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {
  constructor(private articleService: ArticleService) {}
  expandedArticles: { [key: number]: boolean } = {};
  searchQuery = '';
  
  private articles: Article[] = [];

  filteredArticles: Article[] = [];

  ngOnInit() {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.updateSearch(); // Update the filtered articles when the articles are fetched
    });
    // Initialize with default data
    this.filteredArticles = [...this.articles];
  }

  updateSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredArticles = this.articles.filter(article => 
      article.title.toLowerCase().includes(query) || 
      (article.body ?? '').toLowerCase().includes(query) ||
      (article.date ? this.checkDateMatch(article.date, query) : false)
    );
  }

  private checkDateMatch(dateString: string, query: string): boolean {
    try {
      // Option 1: Direct string comparison (matches YYYY, MM, or DD separately)
      if (dateString.includes(query)) {
        return true;
      }
  
      // Option 2: More flexible date parsing and comparison
      const date = new Date(dateString);
      
      // Compare different date formats
      return (
        date.toISOString().includes(query) ||
        date.toLocaleDateString('fr-FR').includes(query) || // French format
        date.toLocaleDateString('en-US').includes(query)    // US format
      );
    } catch (e) {
      return false;
    }
  }

  // Optional: Add a method to handle search input changes
  onSearchChange(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.updateSearch();
  }

  toggleArticle(articleId: number): void {
    this.expandedArticles[articleId] = !this.expandedArticles[articleId];
  }
  
  getPreviewContent(body: string): string[] {
    const paragraphs = body.split('\n').filter(p => p.trim().length > 0);
    // Show first 3 paragraphs or first 500 characters
    return paragraphs.slice(0, Math.min(3, paragraphs.length));
  }
}