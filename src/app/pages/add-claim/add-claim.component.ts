import { Component } from '@angular/core';
import { ReclamationsService } from '../../services/reclamations.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
export enum StatutReclamation {
  TERMINEE = 'Terminée',
  EN_COURS = 'En cours',
  REFUSEE = 'Refusée',
  EN_ATTENTE = 'En attente'
}
@Component({
  selector: 'app-add-claim',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './add-claim.component.html',
  styleUrl: './add-claim.component.css'
})
export class AddClaimComponent {
  StatutReclamation = StatutReclamation;
  claim = {
    location: "",
    ressource: "", // Correction du nom
    probleme: "",
    description:"",
    dateClaim: new Date(), // Doit être une instance de Date
    statut: StatutReclamation.EN_ATTENTE, // Valeur par défaut
    score: 0
  };

  constructor(public _claims:ReclamationsService){}
  ajouterReclamation() {
    this.claim.statut=StatutReclamation.TERMINEE;
    // Ajouter une copie de l'objet `claim` pour éviter les références partagées
   this.claim.score+=1;
       this._claims.claims.push({ ...this.claim });

    // Réinitialiser `claim` avec une nouvelle instance
    this.claim = {
      location: "",
      ressource: "",
      probleme: "",
      description:"",
      dateClaim: new Date(), // Nouvelle date
      statut: StatutReclamation.EN_ATTENTE, // Valeur par défaut
      score: 0
    };
  }
}
