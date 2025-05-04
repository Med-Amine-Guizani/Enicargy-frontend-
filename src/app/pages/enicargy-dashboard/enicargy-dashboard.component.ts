import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class EnicargyDashboardComponent implements OnInit, AfterViewInit {
  chartConsommation!: Chart;
  chartReclamation!: Chart;
  chartParticipation!: Chart;

  consommationData: { electricite: number[]; eau: number[] } = { electricite: [], eau: [] };
  reclamationData: { total: number[]; terminee: number[] } = { total: [], terminee: [] };
  participationData: { name: string; value: number; color: string }[] = [];

  mois = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

  constructor(private dashboardService: EnicargyDashboardService) {
    Chart.register(...registerables);
    console.log('EnicargyDashboardComponent constructor called'); // LOG
  }

  ngOnInit(): void {
    console.log('ngOnInit called'); // LOG
    this.dashboardService.getConsommationData().subscribe(
      data => {
        this.consommationData = data;
        console.log("Données reçues dans le composant :", this.consommationData); // LOG
        this.initConsommationChart();
      },
      error => {
        console.error("Erreur lors de la récupération des données de consommation :", error); // LOG
      }
    );

    this.dashboardService.getReclamationData().subscribe(
      data => {
        this.reclamationData = data;
        this.initReclamationChart();
      },
      error => {
        console.error("Erreur lors de la récupération des données de réclamation :", error); // LOG
      }
    );

    this.dashboardService.getParticipationData().subscribe(
      data => {
        this.participationData = data;
        this.initParticipationChart();
      },
      error => {
        console.error("Erreur lors de la récupération des données de participation :", error); // LOG
      }
    );
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called'); // LOG
  }

  initConsommationChart(): void {
    console.log("initConsommationChart called"); // LOG
    console.log("Données utilisées pour le graphique de consommation :", this.consommationData.electricite, this.consommationData.eau); // LOG
    const canvas = document.getElementById('consommationChart') as HTMLCanvasElement;
    console.log("Canvas element:", canvas); // LOG
    const ctx = canvas ? canvas.getContext('2d') : null;
    console.log("Canvas context:", ctx); // LOG
    if (!ctx) {
      console.error("Erreur: Impossible d'obtenir le contexte 2D du canvas 'consommationChart'"); // LOG
      return;
    }

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.mois,
        datasets: [
          {
            label: 'Électricité en (kWh)',
            data: this.consommationData.electricite,
            borderColor: '#3f51b5',
            backgroundColor: '#3f51b580',
            fill: true
          },
          {
            label: 'Eau en (m3)',
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
    console.log("chartConsommation initialized:", this.chartConsommation); // LOG
  }

  initReclamationChart(): void {
    // Logs pour le graphique de réclamation (similaires à initConsommationChart)
    console.log("initReclamationChart called"); // LOG
    console.log("Données utilisées pour le graphique de réclamation :", this.reclamationData); // LOG
    const canvas = document.getElementById('reclamationChart') as HTMLCanvasElement;
    console.log("Canvas element (reclamationChart):", canvas); // LOG
    const ctx = canvas ? canvas.getContext('2d') : null;
    console.log("Canvas context (reclamationChart):", ctx); // LOG
    if (!ctx) {
      console.error("Erreur: Impossible d'obtenir le contexte 2D du canvas 'reclamationChart'"); // LOG
      return;
    }

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
    console.log("chartReclamation initialized:", this.chartReclamation); // LOG
  }

  initParticipationChart(): void {
    // Logs pour le graphique de participation (similaires aux autres)
    console.log("initParticipationChart called"); // LOG
    console.log("Données utilisées pour le graphique de participation :", this.participationData); // LOG
    const canvas = document.getElementById('participationChart') as HTMLCanvasElement;
    console.log("Canvas element (participationChart):", canvas); // LOG
    const ctx = canvas ? canvas.getContext('2d') : null;
    console.log("Canvas context (participationChart):", ctx); // LOG
    if (!ctx) {
      console.error("Erreur: Impossible d'obtenir le contexte 2D du canvas 'participationChart'"); // LOG
      return;
    }

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
    console.log("chartParticipation initialized:", this.chartParticipation); // LOG
  }
}