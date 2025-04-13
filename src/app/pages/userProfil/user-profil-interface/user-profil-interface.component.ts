import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ReclamationHistoriqueComponent } from '../reclamation-historique/reclamation-historique.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { Reclamation } from '../../../reclamation';
import { ReclamationsService } from '../../../services/reclamations.service';
import { StatutReclamation } from '../reclamation-historique/reclamation-historique.component';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-user-profil-interface',
  templateUrl: './user-profil-interface.component.html',
  styleUrls: ['./user-profil-interface.component.css'],
  standalone: true,
  imports: [MenuComponent, ReclamationHistoriqueComponent, StatisticsComponent, ScoreComponent]
})
export class UserProfilInterfaceComponent {
  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationsService) {}

}
