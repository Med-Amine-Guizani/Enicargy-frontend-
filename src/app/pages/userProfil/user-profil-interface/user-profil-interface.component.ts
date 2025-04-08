import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ReclamationHistoriqueComponent } from '../reclamation-historique/reclamation-historique.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { Reclamation } from '../../../reclamation';
import { ReclamationsService } from '../../../services/reclamations.service';
import { StatutReclamation } from '../reclamation-historique/reclamation-historique.component';
import { threadId } from 'node:worker_threads';

@Component({
  selector: 'app-user-profil-interface',
  templateUrl: './user-profil-interface.component.html',
  styleUrls: ['./user-profil-interface.component.css'],
  standalone: true,
  imports: [MenuComponent, ReclamationHistoriqueComponent, StatisticsComponent]
})
export class UserProfilInterfaceComponent {
  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationsService) {}
  // Ajout d'une réclamation de test
  addReclamation(): void {
    const newReclamation: Reclamation = {
      location: 'Paris',
      ressource: 'Serveur',
      probleme: 'Panne serveur',
      description: 'Le serveur est hors ligne',
      dateClaim: new Date(),
      statut: StatutReclamation.EN_COURS,
      score: 5
    };
    this.reclamationService.addClaim(newReclamation);
    this.reclamations.push(newReclamation);
  }
}
