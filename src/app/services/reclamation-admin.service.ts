import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamationvAdmin';


@Injectable({
  providedIn: 'root'
})
export class ReclamationAdminService {

  private reclamationApiUrl = 'http://localhost:9090/api/v1/reclamations';

  constructor(private http: HttpClient) {}

  // this will be used to fetch all reclamations for the admin page ( admin Pages )
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.reclamationApiUrl);
  }




  // this will be used to fetch all reclamations for the user page ( user Pages )
  addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.reclamationApiUrl, reclamation);
  }

  //this will be used one the update state button is clicked in the reclamation component
  updateReclamationState(id: number, newState: Reclamation['status']): Observable<Reclamation> {
    return this.http.patch<Reclamation>(`${this.reclamationApiUrl}/status/${id}`, { state: newState });
  }
}
