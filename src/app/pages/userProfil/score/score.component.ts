import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationsService } from '../../../services/reclamations.service';
import { StatutReclamation } from '../reclamation-historique/reclamation-historique.component';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit {
  @Input() points: number[] = [10,20,30,40,50,60,70,80,90,100]; // Points de progression
  score: number = 0; // Calculé automatiquement

  constructor(private reclamationsService: ReclamationsService) {}

  ngOnInit(): void {
    this.getScore();
  }

  getScore(): void {
    this.reclamationsService.getClaims().subscribe(reclamations => {
      // On filtre les réclamations terminées
      const finished = reclamations.filter(
        (r: any) => r.statut === StatutReclamation.TERMINEE
      );
      this.score = finished.length * 10;
      this.points.push(this.score)// Exemple: 10 pts par réclamation terminée
    });
  }
}
