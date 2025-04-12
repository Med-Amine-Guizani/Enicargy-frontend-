
import { Chart, ChartConfiguration, ChartTypeRegistry, registerables  } from 'chart.js';
import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LogisticDashboardService } from '../../services/logistic-dashboard.service';


// Enregistrer les composants Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-logistic-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './logistic-dashboard.component.html',
  styleUrls: ['./logistic-dashboard.component.scss']
})
export class LogisticDashboardComponent implements OnInit, AfterViewInit {
  constructor(private logisticService: LogisticDashboardService) {}
  @ViewChild('equipmentChart') equipmentChartRef!: ElementRef<HTMLCanvasElement>;
  
  // Données d'exemple - à remplacer par des données de la base de données
  materials: any[] = [];
  
  // Statistiques globales
  totalEquipments: number = 0;
  goodStateEquipments: number = 0;
  repairEquipments: number = 0;
  brokenEquipments: number = 0;
  
  equipmentChart: Chart | undefined;
  
  
  
  ngOnInit() {
    // Simuler la récupération de données depuis une API/BD
    this.loadEquipmentData();
    this.calculateGlobalStats();
  }
  
  ngAfterViewInit() {
    // Créer le graphique une fois que la vue est initialisée
    setTimeout(() => {
      this.createDoughnutChart();
    }, 0);
  }
  
  // Cette méthode sera remplacée par un appel API réel
  loadEquipmentData() {
    this.logisticService.getMaterials().subscribe(data => {
      this.materials = data;
      this.calculateGlobalStats();
      if (this.equipmentChart) {
        this.updateDoughnutChart();
      } else {
        this.createDoughnutChart();
      }
    });
  }
  
  calculateGlobalStats() {
    this.totalEquipments = this.materials.reduce((sum, item) => sum + item.total, 0);
    this.goodStateEquipments = this.materials.reduce((sum, item) => sum + item.good, 0);
    this.repairEquipments = this.materials.reduce((sum, item) => sum + item.repair, 0);
    this.brokenEquipments = this.materials.reduce((sum, item) => sum + item.broken, 0);
  }
  
  createDoughnutChart() {
    if (!this.equipmentChartRef || !this.equipmentChartRef.nativeElement) {
      console.error('Canvas référence non trouvée');
      return;
    }
    
    const ctx = this.equipmentChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
    
    // Préparer les données pour le graphique
    const chartData = this.materials.map(m => m.repair);
    const chartLabels = this.materials.map(m => m.type);
    const backgroundColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
    ];
    
    this.equipmentChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: chartLabels,
        datasets: [{
          data: chartData,
          backgroundColor: backgroundColors,
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw as number || 0;
                const total = (context.chart.data.datasets[0].data as number[])
                  .reduce((a, b) => (a as number) + (b as number), 0);
                const percentage = Math.round((value / (total as number)) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }
  
  // Pour mettre à jour le graphique si les données changent
  updateDoughnutChart() {
    if (!this.equipmentChart) return;
    
    const chartData = this.materials.map(m => m.repair);
    const chartLabels = this.materials.map(m => m.type);
    
    this.equipmentChart.data.labels = chartLabels;
    this.equipmentChart.data.datasets[0].data = chartData;
    this.equipmentChart.update();
  }
  
  calculatePercentage(total: number, value: number): string {
    return `${(value / total * 100).toFixed(0)}%`;
  }
  
  // Calcule le pourcentage de réparation pour chaque matériel
  getRepairPercentage(material: any): string {
    const totalRepairs = this.materials.reduce((sum, item) => sum + item.repair, 0);
    if (totalRepairs === 0) return '0%';
    return `${Math.round((material.repair / totalRepairs) * 100)}%`;
  }
}
