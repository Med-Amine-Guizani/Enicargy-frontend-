import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import{ConsumptionData,ReclamationData,UtilisationStats} from '../models/chart-data.model';
import { HttpClient} from '@angular/common/http';

 
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private apiUrl =  'http://localhost:9090/api/consommation/scrapped-data';
  
    constructor(private http: HttpClient) {}
  
  getConsumptionData(): Observable<ConsumptionData> {
    return this.http.get<ConsumptionData>(this.apiUrl);
  }
 /* getReclamationData(): Observable<ReclamationData> {
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
  }*/
}
