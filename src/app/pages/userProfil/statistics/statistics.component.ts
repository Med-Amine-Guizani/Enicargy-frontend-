import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ReclamationsService } from '../../../services/reclamations.service';
import { TokenService } from '../../../services/TokenService';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  reclamationChart!: Chart;
  userId: number = -1;

  // Champs pour afficher le nombre de réclamations
  enAttente: number = 0;
  enCours: number = 0;
  terminee: number = 0;

  constructor(
    private reclamationService: ReclamationsService,
    public tokenService: TokenService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const id = this.tokenService.getUserId();
    if (id !== null) {
      this.userId = id;
      this.reclamationService.getStatusCountsByUser(this.userId).subscribe((statusCounts: any) => {
        // Stockage pour affichage
        this.enAttente = statusCounts.en_attente;
        this.enCours = statusCounts.en_cours;
        this.terminee = statusCounts.terminer;

        const chartData = this.convertStatsToChartData(statusCounts);
        this.initReclamationChart(chartData);
      });
    }
  }

  convertStatsToChartData(stats: any): {
    labels: string[];
    values: number[];
    colors: string[];
  }{
    const labels = [
      `En attente (${this.enAttente})`,
      `En cours (${this.enCours})`,
      `Terminée (${this.terminee})`
    ];
    const values = [this.enAttente, this.enCours, this.terminee];
    const colors = ['#FD95A2', '#1BF3EF', '#9886FF'];

    return { labels, values, colors };
  }


  initReclamationChart(data: { labels: string[], values: number[], colors: string[] }): void {
    if (typeof window === 'undefined') return;

    const canvas = document.getElementById('reclamationChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: data.colors,
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Réclamations par statut',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          legend: {
            position: 'right',
            align: 'center',
            labels: {
              boxWidth: 12,
              padding: 16,
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const total = context.dataset.data
                  .filter((item): item is number => typeof item === 'number')
                  .reduce((a, b) => a + b, 0);
                const value = context.raw as number;
                const percentage = Math.round((value / (total || 1)) * 100);
                return `${context.label}: ${percentage}%`;
              }
            }
          }
        }
      }
    };

    this.reclamationChart = new Chart(ctx, config);
  }
}
