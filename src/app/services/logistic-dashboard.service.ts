import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipement } from '../models/Equipement.model';


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
  
  private apiUrl = 'http://localhost:9090/api/equipments'; //Spring Boot backend URL by default 

  constructor(private http: HttpClient) {}

  getMaterials(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.apiUrl);
  }
    // Requête PUT pour mettre à jour l'équipement
    updateEquipment(id: number, equipment: Equipement): Observable<Equipement> {
      return this.http.put<Equipement>(`${this.apiUrl}/${id}`, equipment);
    }
    // Requête DELETE pour supprimer l'équipement
    deleteEquipment(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);  
    
  }
}
