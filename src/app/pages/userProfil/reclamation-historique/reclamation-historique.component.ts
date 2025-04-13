import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReclamationsService } from '../../../services/reclamations.service';
import { Reclamation } from '../../../models/reclamation';

export enum StatutReclamation {
  TERMINEE = 'Terminée',
  EN_COURS = 'En cours',
  REFUSEE = 'Refusée',
  EN_ATTENTE = 'En attente'
}

@Component({
  selector: 'app-reclamation-historique',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reclamation-historique.component.html',
  styleUrl: './reclamation-historique.component.css'
})
export class ReclamationHistoriqueComponent {
  StatutReclamation = StatutReclamation;

  // Définition de claim avec l'interface
  claim: Reclamation = {
    location: "",
    ressource: null,
    probleme: "",
    description: "",
    dateClaim: new Date(),
    statut: StatutReclamation.EN_ATTENTE,
    photo: null
  };

  constructor(public _claims: ReclamationsService) {}
}
