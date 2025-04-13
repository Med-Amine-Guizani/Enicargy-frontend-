import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnicargyDashboardService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getConsommationData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/consommation`);
  }

  getReclamationData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reclamation`);
  }

  getParticipationData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/participation`);
  }
}
