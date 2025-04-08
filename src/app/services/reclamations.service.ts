import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reclamation } from '../reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {
  constructor(private http: HttpClient) {}
  claims: Reclamation[] = [];  // Remplir les réclamations selon ton application

  getClaims(): Observable<Reclamation[]> {
    // Simuler un appel HTTP, ou retourne tes données statiques pour les tests
    return of(this.claims);
  }

  addClaim(claim: Reclamation): void {
    //this.claims.push(claim);  // Ajouter une réclamation à la liste
  }

}
