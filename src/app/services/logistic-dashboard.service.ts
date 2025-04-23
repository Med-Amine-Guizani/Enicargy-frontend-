import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Material {
  type: string;
  total: number;
  good: number;
  repair: number;
  broken: number;
  reserve: number;
}

@Injectable({
  providedIn: 'root'
})
export class LogisticDashboardService {
  
  private apiUrl = 'http://localhost:8080/api'; //Spring Boot backend URL by default 

  constructor(private http: HttpClient) {}

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }
}