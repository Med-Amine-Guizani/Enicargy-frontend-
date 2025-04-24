import { Component } from '@angular/core';
import { ReclamationsService } from '../../services/reclamations.service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reclamation,RessourceType } from '../../models/reclamation';
import { HttpClient } from '@angular/common/http';
export enum StatutReclamation {
  TERMINEE = 'Terminée',
  EN_COURS = 'En cours',
  REFUSEE = 'Refusée',
  EN_ATTENTE = 'En attente'
}
@Component({
  selector: 'app-add-claim',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent {
  StatutReclamation = StatutReclamation;

  ressources: RessourceType[] = ['Eau', 'Électricité', 'Logistique'];

  claim: Reclamation = {
    location: "",
    probleme: "",
    ressource: null,
    description: "",
    dateClaim: new Date(),
    statut: StatutReclamation.EN_ATTENTE,
    photo: null
  };

  constructor(
    public _claims: ReclamationsService,
    private http: HttpClient      /* nécessaire pour l’upload direct si utilisé ici*/,
    
  ) {}

  // Méthode pour gérer la sélection du fichier
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.claim.photo = input.files[0];
    }
  }

  // Méthode pour ajouter une réclamation avec un JSON et éventuellement une photo
  ajouterReclamation() {
    const reclamationData = {
      titre: this.claim.probleme,
      description: this.claim.description,
      local: this.claim.location,
      salle: 'Aucune',
      userid:2
    };

    this._claims.addClaim(reclamationData).subscribe({
      next: (res) => {
        // Si une photo a été sélectionnée, on l'envoie ensuite
        if (this.claim.photo) {
          this._claims.addPhoto(this.claim.photo, res.id).subscribe();
        }

        // Réinitialisation du formulaire après ajout
        this.claim = {
          location: "",
          probleme: "",
          ressource:null,
          description: "",
          dateClaim: new Date(),
          statut: StatutReclamation.EN_ATTENTE,
          photo: null
        };
      },
      error: (err) => {
        console.error('Erreur lors de l’envoi :', err);
      }
    });
  }
}
