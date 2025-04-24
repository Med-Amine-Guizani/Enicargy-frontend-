import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationsService } from '../../../services/reclamations.service';
import { TokenService } from '../../../services/TokenService';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit {
  @Input() points: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // (peut être utilisé pour un affichage visuel)
  score: number = 0;
  userId: number = -1;

  enAttente: number = 0;
  enCours: number = 0;
  terminee: number = 0;

  constructor(
    private reclamationsService: ReclamationsService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const id = this.tokenService.getUserId();
    if (id !== null) {
      this.userId = id;

      this.reclamationsService.getStatusCountsByUser(this.userId).subscribe((statusCounts: any) => {
        this.enAttente = statusCounts.en_attente;
        this.enCours = statusCounts.en_cours;
        this.terminee = statusCounts.terminer;

        // Calcul du score basé sur les réclamations terminées
        this.score = this.terminee * 10;
      });
    }
  }
}
