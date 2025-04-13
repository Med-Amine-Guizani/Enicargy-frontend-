import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { EnicargyDashboardService } from '../../services/enicargy-dashboard.service';

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

  consommationData: { electricite: number[]; eau: number[] } = { electricite: [], eau: [] };
  reclamationData: { total: number[]; terminee: number[] } = { total: [], terminee: [] };
  participationData: { name: string; value: number; color: string }[] = [];

  loadMockData(): void {
    this.consommationData = {
      electricite: [120, 130, 110, 140, 150, 160, 170, 160, 150, 140, 130, 120],
      eau: [80, 90, 70, 85, 95, 100, 105, 95, 90, 85, 80, 75]
    };
  
    this.reclamationData = {
      total: [5, 8, 10, 12, 15, 20, 18, 17, 12, 10, 6, 4],
      terminee: [3, 5, 7, 9, 12, 16, 14, 15, 10, 9, 5, 3]
    };
  
    this.participationData = [
      { name: 'Participé', value: 60, color: '#4caf50' },
      { name: 'Non Participé', value: 40, color: '#f44336' }
    ];
  
    this.initConsommationChart();
    this.initReclamationChart();
    this.initParticipationChart();
  }

  mois = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];



  constructor(private dashboardService: EnicargyDashboardService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadMockData();
    this.dashboardService.getConsommationData().subscribe(data => {
      this.consommationData = data;
      this.initConsommationChart();
    });

    this.dashboardService.getReclamationData().subscribe(data => {
      this.reclamationData = data;
      this.initReclamationChart();
    });

    this.dashboardService.getParticipationData().subscribe(data => {
      this.participationData = data;
      this.initParticipationChart();
    });
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
            borderColor: '#3f51b5',
            backgroundColor: '#3f51b580',
            fill: true
          },
          {
            label: 'Eau',
            data: this.consommationData.eau,
            borderColor: '#4caf50',
            backgroundColor: '#4caf5080',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Consommation par mois',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          legend: {
            position: 'bottom'
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
        labels: this.mois,
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
        datasets: [
          {
            data: this.participationData.map(item => item.value),
            backgroundColor: this.participationData.map(item => item.color),
            borderWidth: 0
          }
        ]
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
              label: function (context) {
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
