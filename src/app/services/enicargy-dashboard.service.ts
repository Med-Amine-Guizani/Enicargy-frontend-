import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnicargyDashboardService {
  private apiUrl =  'http://localhost:9090/api/consommation/scrapped-data';

  constructor(private http: HttpClient) {}
  
  getConsommationData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getReclamationData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reclamation`);
  }

  getParticipationData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/participation`);
  }
}
