import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReclamationsService } from '../../../services/reclamations.service';
import { Reclamation } from '../../../models/reclamationvAdmin';
import { TokenService } from '../../../services/TokenService';

export enum StatutReclamation {
  TERMINEE = 'Terminer',
  EN_COURS = 'En cours',
  EN_ATTENTE = 'En attente'
}

@Component({
  selector: 'app-reclamation-historique',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reclamation-historique.component.html',
  styleUrls: ['./reclamation-historique.component.css'] 
})
export class ReclamationHistoriqueComponent implements OnInit {
  StatutReclamation = StatutReclamation;

  claims: Reclamation[] = [];
  userId: number = -1;

  constructor(
    public _claims: ReclamationsService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const id = this.tokenService.getUserId();
    if (id !== null && !isNaN(id)) {
      this.userId = id;
      this.loadUserClaims();
    } else {
      console.warn("Aucun ID utilisateur valide trouvé !");
    }
  }

  loadUserClaims(): void {
    this._claims.getClaimsByUser(this.userId).subscribe({
      next: (data: Reclamation[]) => {
        this.claims = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réclamations :', err);
      }
    });
  }
}
