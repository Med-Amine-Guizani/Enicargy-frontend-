import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-enicargy-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enicargy-dashboard.component.html',
  styleUrls: ['./enicargy-dashboard.component.scss']
})
export class EnicargyDashboardComponent implements OnInit {
  chartConsommation!: Chart;
  chartReclamation!: Chart;
  chartParticipation!: Chart;

  // Données pour les graphiques
  consommationData = {
    electricite: [40, 45, 65, 75, 65, 60, 70, 65, 75, 90, 85, 80],
    eau: [135, 160, 180, 165, 140, 165, 180, 170, 160, 180, 170, 190]
  };

  reclamationData = {
    total: [20, 15, 25, 10, 10, 15, 20, 15, 20, 10, 20, 15],
    terminee: [16, 5, 14, 0, 10, 5, 15, 0, 10, 5, 15, 0]
  };

  participationData = [
    { name: 'Étudiants', value: 40, color: '#4CD4B0' },
    { name: 'Enseignants', value: 25, color: '#FFB74D' },
    { name: 'Personnel', value: 20, color: '#FF6B6B' },
    { name: 'Autres', value: 15, color: '#ddd' }
  ];

  mois = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initConsommationChart();
    this.initReclamationChart();
    this.initParticipationChart();
  }

  initConsommationChart(): void {
    const canvas = document.getElementById('consommationChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.mois,
        datasets: [
          {
            label: 'Électricité',
            data: this.consommationData.electricite,
            borderColor: '#FFD700',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 0
          },
          {
            label: 'Eau',
            data: this.consommationData.eau,
            borderColor: '#4682B4',
            backgroundColor: 'transparent',
            tension: 0.4,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Variation de la consommation d\'eau/électricité par mois',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyle: 'line'
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#f0f0f0'
            }
          },
          y: {
            grid: {
              color: '#f0f0f0'
            }
          }
        }
      }
    };

    this.chartConsommation = new Chart(ctx, config);
  }

  initReclamationChart(): void {
    const canvas = document.getElementById('reclamationChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Janv', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [
          {
            label: 'Réclamation totale',
            data: this.reclamationData.total,
            backgroundColor: '#4040FF',
            barPercentage: 0.9,
            categoryPercentage: 0.8
          },
          {
            label: 'Réclamation terminée',
            data: this.reclamationData.terminee,
            backgroundColor: '#FF8000',
            barPercentage: 0.9,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Variation de réclamation par mois',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          legend: {
            position: 'right'
          }
        },
        scales: {
          y: {
            max: 25,
            beginAtZero: true
          }
        }
      }
    };

    this.chartReclamation = new Chart(ctx, config);
  }

  initParticipationChart(): void {
    const canvas = document.getElementById('participationChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: this.participationData.map(item => item.name),
        datasets: [{
          data: this.participationData.map(item => item.value),
          backgroundColor: this.participationData.map(item => item.color),
          borderWidth: 0,
        
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Participation par statut',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          legend: {
            position: 'right',
            align: 'start',
            labels: {
              boxWidth: 12,
              padding: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data
                  .filter((item): item is number => typeof item === 'number')
                  .reduce((a, b) => a + b, 0);
                const value = context.raw as number;
                const percentage = Math.round(((value as number) / (Number(total) || 1)) * 100);
                return `${context.label}: ${percentage}%`;
              }
            }
          }
        }
      }
    };

    this.chartParticipation = new Chart(ctx, config);
  }
}