import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Article } from '../models/article';
import { delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [
    { id: 1, title: 'Article 1', body: 'Content of article 1' },
    { id: 2, title: 'Article 2', body: 'Content of article 2' },
    { id: 3, title: 'Article 3', body: 'Content of article 3' }
  ];
  

  private apiUrl = 'http://localhost:9090/api/v1/articles'; 

  constructor(private http : HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
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
    return this.http.post<Article>(this.apiUrl, article).pipe(
      tap((createdArticle) => {
        this.articles.push(createdArticle);
      }),
      catchError((error) => {
        console.error('Failed to create article', error);
        return throwError(() => new Error('Failed to create article'));
      })
    );
  }
  

  updateArticle(article: Article): Observable<Article> {
    return this.http.patch<Article>(this.apiUrl, article).pipe(
      tap((updatedArticle) => {
        const index = this.articles.findIndex(a => a.id === updatedArticle.id);
        if (index !== -1) {
          this.articles[index] = updatedArticle; 
        }
      }),
      catchError((error) => {
        console.error('Failed to update article', error);
        return throwError(() => new Error('Failed to update article'));
      })
    );
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.articles = this.articles.filter(a => a.id !== id); // Remove from local array
      }),
      catchError((error) => {
        console.error('Failed to delete article', error);
        return throwError(() => new Error('Failed to delete article'));
      })
    );
  }
}