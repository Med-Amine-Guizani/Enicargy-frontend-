import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../reclamationvAdmin';


@Injectable({
  providedIn: 'root'
})
export class ReclamationAdminService {

  private reclamationApiUrl = 'http://localhost:8080/api/reclamations';
  private imageApiUrl = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient) {}

  // this will be used to fetch all reclamations for the admin page ( admin Pages )
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.reclamationApiUrl);
  }

  //this will be used in the add reclamation for user page ( user Pages )
  uploadImage(file: File , id : string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    return this.http.post(`${this.imageApiUrl}/upload`, formData);
  }

  // this will be used to fetch an image by url stored in a data base for a reclamation
  getImageUrl(id: Number): string {
    return `${this.imageApiUrl}/${id}`;
  }

  // this will be used to fetch all reclamations for the user page ( user Pages )
  addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.reclamationApiUrl, reclamation);
  }

  //this will be used one the update state button is clicked in the reclamation component
  updateReclamationState(id: number, newState: Reclamation['state']): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.reclamationApiUrl}/${id}/state`, { state: newState });
  }
}
