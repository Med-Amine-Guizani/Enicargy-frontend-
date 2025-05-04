import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reclamation } from './../models/reclamationvAdmin';
import { HttpClient } from '@angular/common/http';
interface MonthlyStat {
  mois: string;
  total: number;
  terminees: number;
}
@Injectable({
  providedIn: 'root',
})
export class ReclamationsService {
  private reclamationApiUrl = 'http://localhost:9090/api/v1/reclamations';
  private imageApiUrl = 'http://localhost:9090/api/images';

  constructor(private http: HttpClient) {}

  // Optionnel : données simulées pour tests
  claims: Reclamation[] = [];

  getClaims(): Observable<Reclamation[]> {
    return of(this.claims);
  }
  getClaimsByUser(userId: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.reclamationApiUrl}/user/${userId}`);
  }
  // Envoi d'une réclamation avec un objet JSON
  addClaim(claim: any): Observable<any> {
    return this.http.post(this.reclamationApiUrl, claim);
  }

  // Envoi de la photo (en FormData) pour une réclamation donnée
  addPhoto(photo: File, id: number): Observable<any> {
    const photoData = new FormData();
    photoData.append('file', photo);
    return this.http.post(`http://localhost:9090/api/v1/photo/${id}`, photoData);
  }

  getStatusCountsByUser(userId: number |null) {
    return this.http.get(`http://localhost:9090/api/v1/reclamation/stats/${userId}`);
  }
  getReclamationByMonth(): Observable<MonthlyStat[]> {
    return this.http.get<MonthlyStat[]>('http://localhost:9090/api/v1/reclamation/reclamation-by-month');
  }

  getReclamationStatusByMonth(): Observable<MonthlyStat[]> {
    return this.http.get<MonthlyStat[]>('http://localhost:9090/api/v1/reclamation/status-by-month');
  }
  
  
  getReclamationCountsByUserRole(){
    return this.http.get(`http://localhost:9090/api/v1/reclamation/statusUser`);
  }
}
