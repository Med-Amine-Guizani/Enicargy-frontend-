import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Article } from '../models/article';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // Mock data - replace with actual API calls later
  private articles: Article[] = [
    {
      id: 1,
      title: 'Energy Management Strategies',
      text: 'Implementing smart grid technologies to optimize power distribution across campus facilities hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh.'
    },
    {
      id: 2,
      title: 'Water Conservation Program',
      text: 'New rainwater harvesting system reduces municipal water usage by 40% in pilot buildings.'
    },
    {
      id: 3,
      title: 'Solar Power Initiative',
      text: 'Installation of photovoltaic panels projected to cover 25% of campus energy needs by 2025.'
    },
    {
      id: 4,
      title: 'IoT Monitoring Systems',
      text: 'Real-time consumption tracking through 500+ smart sensors deployed across university buildings.'
    },
    {
      id: 5,
      title: 'Sustainable Campus Goals',
      text: 'University aims to achieve net-zero water and energy consumption by 2030 through integrated management.'
    }
  ];

  constructor() { }

  getArticles(): Observable<Article[]> {
    // Replace with actual API call: return this.http.get<Article[]>('api/articles');
    return of(this.articles).pipe(
      delay(300) // Simulate network delay
    );
  }

  getArticleById(id: number): Observable<Article> {
    // Replace with actual API call: return this.http.get<Article>(`api/articles/${id}`);
    const article = this.articles.find(a => a.id === id);
    if (!article) {
      return throwError(() => new Error(`Article with id ${id} not found`));
    }
    return of(article).pipe(
      delay(300) // Simulate network delay
    );
  }

  createArticle(article: Article): Observable<Article> {
    // Replace with actual API call: return this.http.post<Article>('api/articles', article);
    // For now, simulate API response
    return of({
      ...article,
      id: Math.floor(Math.random() * 1000) + 100 // Simulate server-assigned ID
    }).pipe(
      delay(800), // Simulate network delay
      tap(newArticle => console.log('Article created:', newArticle))
    );
  }
  

  updateArticle(article: Article): Observable<Article> {
    // Replace with actual API call: return this.http.put<Article>(`api/articles/${article.id}`, article);
    const index = this.articles.findIndex(a => a.id === article.id);
    if (index === -1) {
      return throwError(() => new Error(`Article with id ${article.id} not found`));
    }
    
    this.articles[index] = { ...article };
    return of(article).pipe(
      delay(500), // Simulate network delay
      tap(() => console.log('Article updated:', article))
    );
  }

  deleteArticle(id: number): Observable<void> {
    // Replace with actual API call: return this.http.delete<void>(`api/articles/${id}`);
    const index = this.articles.findIndex(a => a.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Article with id ${id} not found`));
    }
    
    this.articles.splice(index, 1);
    return of(undefined).pipe(
      delay(500), // Simulate network delay
      tap(() => console.log('Article deleted:', id))
    );
  }
}