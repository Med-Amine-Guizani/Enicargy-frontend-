import { Component } from '@angular/core';
import { ReclamationsService } from '../../services/reclamations.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reclamation, RessourceType } from '../../reclamation';
export enum StatutReclamation {
  TERMINEE = 'Terminée',
  EN_COURS = 'En cours',
  REFUSEE = 'Refusée',
  EN_ATTENTE = 'En attente'
}
@Component({
  selector: 'app-add-claim',
  standalone: true,
  imports: [FormsModule, RouterLink,CommonModule],
  templateUrl: './add-claim.component.html',
  styleUrl: './add-claim.component.css'
})
export class AddClaimComponent {
  StatutReclamation = StatutReclamation;

  ressources: RessourceType[] = ['Eau', 'Électricité', 'Logistique'];

  claim: Reclamation = {
    location: "",
    ressource: null,
    probleme: "",
    description: "",
    dateClaim: new Date(),
    statut: StatutReclamation.EN_ATTENTE,
    photo: null
  };
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.claim.photo = file;
    }
  }

  constructor(public _claims: ReclamationsService) {}

  ajouterReclamation() {
    this._claims.claims.push({ ...this.claim });

    this.claim = {
      location: "",
      ressource: null,
      probleme: "",
      description: "",
      dateClaim: new Date(),
      statut: StatutReclamation.EN_ATTENTE,
      photo: null
    };
  }
}