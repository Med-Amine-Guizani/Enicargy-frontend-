import { Component, OnInit } from '@angular/core';
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
export class ReclamationHistoriqueComponent implements OnInit{
  StatutReclamation = StatutReclamation;

  claims: Reclamation[] = [];
  userId: number = 2; // à remplacer dynamiquement

  constructor(public _claims: ReclamationsService) {}

  ngOnInit(): void {
    this.loadUserClaims();
  }

  loadUserClaims(): void {
    this._claims.getClaimsByUser(this.userId).subscribe((data: Reclamation[]) => {
      console.log('Réclamations récupérées :', data); // ← pour vérifier dans la console
      this.claims = data;
    });
  }

  
}
