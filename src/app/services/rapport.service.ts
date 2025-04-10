import { Injectable } from '@angular/core';
import { Rapport } from '../rapport'
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RapportService {
  rapports : Rapport[] = [{
    id: 1,
    title:'hi' ,
    date: new Date().toISOString().split('T')[0]
} ,
{
    id: 2,
    title:'Rapport consomation d eau pour l annex pandant l hiver ' ,
    date: new Date(2024,2,3).toISOString().split('T')[0]
} ,
{
    id: 3,
    title:'Rapport consomation d eau pour l annex pandant l automne ' ,
    date: new Date().toISOString().split('T')[0]
} ,
{
    id: 4,
    title:'Rapport consomation d eau pour l annex pandant le printemps ' ,
    date: new Date(22/2/2025).toISOString().split('T')[0]
}]
  constructor() { }


  getRapports(): Observable<Rapport[]> {
      // Replace with actual API call: return this.http.get<Article[]>('api/articles');
      return of(this.rapports).pipe(
        delay(300) // Simulate network delay
      );
    }
  
    
  
    addReport(rapport: Rapport): Observable<Rapport> {
      
  
      this.rapports.push(rapport);
  
      // Simulate API delay
      return of(rapport).pipe(delay(500));
    }
    
  
    
  
    deleteRapport(id: number): Observable<void> {
      // Replace with actual API call: return this.http.delete<void>(`api/articles/${id}`);
      const index = this.rapports.findIndex(a => a.id === id);
      if (index === -1) {
        return throwError(() => new Error(`rapport with id ${id} not found`));
      }
      
      this.rapports.splice(index, 1);
      return of(undefined).pipe(
        delay(500), // Simulate network delay
        tap(() => console.log('rapport deleted:', id))
      );
    }
}
