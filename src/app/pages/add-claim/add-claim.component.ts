import { Component } from '@angular/core';
import { ReclamationsService } from '../../services/reclamations.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reclamation } from '../../models/reclamationvAdmin';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../services/TokenService';
export enum StatutReclamation {
  TERMINEE = 'Terminer',
  EN_COURS = 'En_cours',
  EN_ATTENTE = 'En_Attente'
}


@Component({
  selector: 'app-add-claim',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent {
  // Objet pour contenir la nouvelle réclamation
  claim: Reclamation = {
    titre: '',
    description: '',
    date: '',
    local: '',
    salle: '',
    status: 'En_Attente',
    photoUrl: ''
  };

  // Fichier sélectionné
  selectedFile: File | null = null;

  constructor(
    public _claims: ReclamationsService,
    private http: HttpClient,
    public tokenService: TokenService
  ) {}

  // Méthode pour gérer la sélection d'un fichier
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Envoie de la réclamation au serveur
  ajouterReclamation() {
    const reclamationData = {
      titre: this.claim.titre,
      description: this.claim.description,
      local: this.claim.local,
      salle: this.claim.salle,
      status: this.claim.status,
      userid: this.tokenService.getUserId()
    };

    this._claims.addClaim(reclamationData).subscribe({
      next: (res) => {
        if (this.selectedFile) {
          this._claims.addPhoto(this.selectedFile, res.id).subscribe();
        }

        // Réinitialisation du formulaire
        this.claim = {
          titre: '',
          description: '',
          date: '',
          local: '',
          salle: '',
          status: 'En_Attente',
          photoUrl: ''
        };
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la réclamation :', err);
      }
    });
  }
}
