import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import{ConsumptionData,ReclamationData,UtilisationStats} from '../models/chart-data.model';
import { HttpClient} from '@angular/common/http';

 
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private apiUrl = 'http://localhost:8080/api'; //Spring Boot backend URL by default 
  constructor(private http: HttpClient) { }
  consumptionData: ConsumptionData[] = [];  // vide par défaut
  
    // Remplissage initial vide, mais valide
    reclamationData: ReclamationData = {
      enAttente: 0,
      enCours: 0,
      terminee: 0
    };
  
    statsData: UtilisationStats = {
      utilisateurs: 0,
      max: 1, // éviter division par 0 dans progress bar
      eau: 0,
      electricite: 0,
      reclamations: 0,
      min: 1 // éviter division par 0 dans progress bar,
  
    };
  

  /**
   * Récupère les données de consommation depuis le backend
   * @param period Période à filtrer (optionnel)
   */
  getConsumptionData(): Observable<ConsumptionData[]> {
    let url = `${this.apiUrl}/consumption`;
  return this.http.get<ConsumptionData[]>(url);
  }
  getReclamationData(): Observable<ReclamationData> {
    let url = `${this.apiUrl}/reclamations/stats`;
    return this.http.get<ReclamationData>(url);
  }

 //Elle prend un paramètre optionnel userId pour filtrer les statistiques par utilisateur. Si ce paramètre est fourni, il est ajouté à l'URL sous forme de paramètre de requête
  getUtilisationStats(userId?: string): Observable<UtilisationStats> {
    let url = `${this.apiUrl}/stats/utilisation`;
    if (userId) {
      url += `?userId=${userId}`;
    }
    return this.http.get<UtilisationStats>(url);
  }
}
