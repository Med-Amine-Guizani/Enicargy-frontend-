import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {ChartService } from '../../../services/chart.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import{ConsumptionData,ReclamationData,UtilisationStats} from '../../../models/chart-data.model';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { Chart, ChartConfiguration, ChartTypeRegistry, registerables  } from 'chart.js';
import { LogisticsService } from '../../../services/logistics.service';
import { LogisticsMonitoringComponent } from '../../../components/logistics-monitoring/logistics-monitoring.component';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule, SidebarComponent,LogisticsMonitoringComponent],
  providers: [ChartService] 
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;

  isLoading:boolean=true;
  chairs: number = 0;
  tables: number = 0;
  projectors: number = 0;

  private lineChart?: Chart;
  private doughnutChart?: Chart;

  consumptionData: ConsumptionData[] = [];  // vide par défaut

  // Remplissage initial vide, mais valide
  reclamationData: ReclamationData = {
    enAttente: 0,
    enCours: 0,
    terminee: 0
  };

  statsData: UtilisationStats = {
    utilisateurs: 0,
    max: 1, // éviter division par 0 dans progress bar
    eau: 0,
    electricite: 0,
    reclamations: 0,
    min: 1 // éviter division par 0 dans progress bar,

  };

  constructor( private chartService: ChartService ,private logisticsService: LogisticsService) {}

  ngOnInit() {
    // Example using forkJoin if all values load together
    forkJoin({
      chairs: this.logisticsService.getChairs(),
      tables: this.logisticsService.getDesks(),
      projectors: this.logisticsService.getProjectors(),
    }).subscribe(data => {
      this.chairs = data.chairs;
      this.tables = data.tables;
      this.projectors = data.projectors;
      this.isLoading = false; // 🔥 turn off loading once data is ready
    });
    
    this.chartService.getConsumptionData().subscribe(data => {
      this.consumptionData = data;
    });

    this.chartService.getReclamationData().subscribe(data => {
      this.reclamationData = data;
    });

    this.chartService.getUtilisationStats().subscribe(data => {
      this.statsData = data;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createLineChart();
      this.createDoughnutChart();
    }, 500);
  }
  createLineChart() {
    const ctx = this.lineChartRef.nativeElement.getContext('2d');
    
    // Vérification du contexte
  if (!ctx) {
    console.error('Impossible d\'obtenir le contexte du canvas');
    return;
  }

  const labels = this.consumptionData.map(item => item.month);
  const electriciteData = this.consumptionData.map(item => item.electricite);
  const eauData = this.consumptionData.map(item => item.eau);
  
  // Destruction du graphique existant s'il y en a un
  if (this.lineChart) {
    this.lineChart.destroy();
  }

  this.lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Électricité',
          data: electriciteData,
          borderColor: '#d0b055',
          backgroundColor: 'rgba(208, 176, 85, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Eau',
          data: eauData,
          borderColor: '#5084d0',
          backgroundColor: 'rgba(80, 132, 208, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Variation de la consommation d\'eau/électricité par mois'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

  createDoughnutChart(): void {
    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    
    // Vérification du contexte
    if (!ctx) {
      console.error('Impossible d\'obtenir le contexte du canvas');
      return;
    }
  
    // Destruction du graphique existant s'il y en a un
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }
  
    this.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['En Attente', 'En Cours', 'Terminée'],
        datasets: [{
          data: [this.reclamationData.enAttente, this.reclamationData.enCours, this.reclamationData.terminee],
          backgroundColor: [
            '#ff6384',
            '#36a2eb',
            '#4bc0c0'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
 
  
  getProgressBarClass(value: number, max: number): string {
    const percentage = (value / max) * 100;
    
    if (percentage < 30) return 'low';
    if (percentage < 70) return 'medium';
    return 'high';
  }
    
  
    
}
