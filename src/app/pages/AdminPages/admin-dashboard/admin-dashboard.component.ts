import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ConsumptionData } from '../../../models/chart-data.model';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { Chart, registerables } from 'chart.js';
import { LogisticsMonitoringComponent } from '../../../components/logistics-monitoring/logistics-monitoring.component';
import { ReclamationsService } from '../../../services/reclamations.service';
import { TokenService } from '../../../services/TokenService';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, SidebarComponent, LogisticsMonitoringComponent],
  providers: [ChartService]
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;

  isLoading: boolean = true;
  private lineChart?: Chart;
  private doughnutChart?: Chart;
  consumptionData: { electricite: number[]; eau: number[] } = { electricite: [], eau: [] };
  statsData: any = { utilisateurs: '...', electricite: '...', eau: '...', reclamations: '...' }; // Exemple de données pour les stats
  reclamationStats: any = { enAttente: 0, enCours: 0, terminee: 0 };
  chairs: number = 15; // Exemple de données logistiques
  tables: number = 7;
  projectors: number = 2;


   // Champs pour afficher le nombre de réclamations
   enAttente: number = 0;
   enCours: number = 0;
   terminee: number = 0;


  constructor(private chartService: ChartService , 
    private reclamationService: ReclamationsService,
    public tokenService: TokenService) {}

  ngOnInit() {
    this.loadInitialData();
    const token = this.tokenService.getToken();
    if (token !== null) {
      this.reclamationService.getReclamationStatusByMonth().subscribe((statusCounts: any[]) => {
        if (statusCounts.length > 0) {
          const lastMonth = statusCounts[statusCounts.length - 1];
          this.enAttente = lastMonth.enAttente;
          this.enCours = lastMonth.enCours;
          this.terminee = lastMonth.terminees;
          const chartData = this.convertStatsToChartData(lastMonth);
          this.createDoughnutChart(chartData);
        }
      });
    }

  }
  convertStatsToChartData(stats: any): { enAttente: number; enCours: number; terminee: number } {
    return {
      enAttente: stats.enAttente || 0,
      enCours: stats.enCours || 0,
      terminee: stats.terminees || 0
    };
  }

  ngAfterViewInit() {
    // La création des graphiques est déplacée dans loadInitialData pour s'assurer que les données sont chargées
  }

  loadInitialData() {
    this.isLoading = true;
    console.log('loadInitialData called');
    this.chartService.getConsumptionData().subscribe(
      (data: ConsumptionData) => {
        console.log('Données brutes reçues :', data);
        if (data && data.electricite && data.eau) {
          this.consumptionData = {
            electricite: data.electricite,
            eau: data.eau
          };
          console.log('consumptionData assigné :', this.consumptionData);
          this.createLineChart();
        } else {
          console.warn('Données invalides ou absentes :', data);
        }
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des données :', error);
        this.isLoading = false;
      }
    );
    // Simuler la récupération des données pour les statistiques et le graphique doughnut
    // Dans une application réelle, vous auriez probablement d'autres services pour cela
    setTimeout(() => {
      this.statsData = { utilisateurs: 125, electricite: '350 kWh', eau: '12 m³', reclamations: 5 };
      this.reclamationStats = { enAttente: 10, enCours: 15, terminee: 25 };
      //this.createDoughnutChart();
      this.isLoading = false;
    }, 1000);

    // Simuler le chargement des données logistiques
    setTimeout(() => {
      this.chairs = 22;
      this.tables = 10;
      this.projectors = 3;
    }, 1500);
  }

  createLineChart() {
    if (!this.lineChartRef?.nativeElement) {
      console.error('lineChartRef is undefined');
      return;
    }

    const ctx = this.lineChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get line chart context');
      return;
    }

    const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const electriciteData = this.consumptionData?.electricite || [];
    const eauData = this.consumptionData?.eau || [];
    console.log('Labels:', labels);
    console.log('Electricite Data:', electriciteData);
    console.log('Eau Data:', eauData);

    if (electriciteData.length !== labels.length) {
      console.warn('La longueur des données électrique ne correspond pas aux labels:', electriciteData.length, labels.length);
    }
    if (eauData.length !== labels.length) {
      console.warn('La longueur des données eau ne correspond pas aux labels:', eauData.length, labels.length);
    }

    if (this.lineChart) {
      this.lineChart.destroy();
    }

    try {
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Électricité en (kWh)',
              data: electriciteData,
              borderColor: '#3f51b5',
              backgroundColor: '#3f51b580',
              fill: true
            },
            {
              label: 'Eau en (m3)',
              data: eauData,
              borderColor: '#4caf50',
              backgroundColor: '#4caf5080',
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio:false,
          
          plugins: {
            title: {
              display: true,
              text: 'Consommation d\'électricité et d\'eau ',
              font: { size: 14, weight: 'bold' }
            },
            legend: { position: 'bottom' }
          },
          scales: { y: { beginAtZero: true } }
        }
      });
      console.log('Line chart created:', this.lineChart);
    } catch (error) {
      console.error('Error creating line chart:', error);
    }
  }
  createDoughnutChart(data: { enAttente: number; enCours: number; terminee: number }) {
    if (!this.doughnutChartRef?.nativeElement) {
      console.error('doughnutChartRef is undefined');
      return;
    }

    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get doughnut chart context');
      return;
    }

    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['En attente', 'En cours', 'Terminée'],
        datasets: [{
          data: [data.enAttente, data.enCours, data.terminee],
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fegi'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
    
  }

}

  /*createDoughnutChart() {
    if (!this.doughnutChartRef?.nativeElement) {
      return;
    }

    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get doughnut chart context');
      return;
    }

    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['En Attente', 'En Cours', 'Terminée'],
        datasets: [{
          data: [this.reclamationStats.enAttente, this.reclamationStats.enCours, this.reclamationStats.terminee],
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Statut des Réclamations'
          }
        }
      }
    });
  }*/
  