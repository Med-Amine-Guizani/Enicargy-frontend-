import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reclamation,RessourceType } from '../reclamation';  // Chemin correct à adapter
import { StatutReclamation } from '../pages/add-claim/add-claim.component';
@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {
  ressources:RessourceType[]=['Eau','Logistique','Électricité']

  claims: Reclamation[] = [
    {
      location: 'Salle A1',
      ressource: 'Logistique',
      probleme: 'Ne fonctionne pas',
      description: 'Le projecteur de la salle A1 ne s’allume plus.',
      dateClaim: new Date('2024-12-01'),
      statut: StatutReclamation.EN_COURS,
      photo:null
    },
    {
      location: 'Laboratoire B2',
      ressource: 'Logistique',
      probleme: 'Lent',
      description: 'Le PC met 15 minutes à démarrer.',
      dateClaim: new Date('2025-01-10'),
      statut: StatutReclamation.EN_ATTENTE,
      photo:null
    },
    {
      location: 'Salle C3',
      ressource: 'Logistique',
      probleme: 'Fuite',
      description: 'De l’eau coule sous le climatiseur.',
      dateClaim: new Date('2025-02-22'),
      statut: StatutReclamation.TERMINEE,
      photo:null
    },
    {
      location: 'Amphi D4',
      ressource: 'Logistique',
      probleme: 'Grésillement',
      description: 'Le micro émet un bruit de fond constant.',
      dateClaim: new Date('2025-03-15'),
      statut: StatutReclamation.REFUSEE,
      photo:null
    },
    {
      location: 'Bureau Admin',
      ressource: 'Logistique',
      probleme: 'Plus de papier',
      description: 'Toujours en panne de papier malgré signalement.',
      dateClaim: new Date('2025-03-20'),
      statut: StatutReclamation.TERMINEE,
      photo:null
    }
  ];;  // Remplir les réclamations selon ton application

  getClaims(): Observable<Reclamation[]> {
    // Simuler un appel HTTP, ou retourne tes données statiques pour les tests
    return of(this.claims);
  }

  addClaim(claim: Reclamation): void {
    this.claims.push(claim);  // Ajouter une réclamation à la liste
  }
}
