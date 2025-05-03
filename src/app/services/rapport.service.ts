import { Injectable } from '@angular/core';
import { Rapport } from '../models/rapport'
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RapportUploadPayload } from '../models/rapportuploadplayload';
@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private apiUrl : string  = 'http://localhost:9090/api/v1/rapports'; 
  rapports : Rapport[] = []
  constructor(private http : HttpClient) { }


  getRapports(): Observable<Rapport[]> {
      return this.http.get<Rapport[]>(this.apiUrl);    
    }
  
    
  
    addReport(data : RapportUploadPayload ): Observable<Rapport> {
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('title', data.title);
       return this.http.post<Rapport>(this.apiUrl, formData).pipe(
        tap((newRapport: Rapport) => {
          this.rapports.push(newRapport);
          console.log('rapport added:', newRapport);
        }
      ));

      console.log(this.rapports);
      
    }
    
  
    
  
    deleteRapport(id: number): Observable<void> {
      // Replace with actual API call: return this.http.delete<void>(`api/articles/${id}`);
      return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
        tap(() => {
          this.rapports = this.rapports.filter(rapport => rapport.id !== id);
          console.log('Rapport deleted:', id);
        })
      );
    }
}
