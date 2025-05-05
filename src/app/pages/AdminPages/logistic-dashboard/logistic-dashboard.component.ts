import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { LogisticDashboardService } from '../../../services/logistic-dashboard.service';
import { Equipement } from '../../../models/Equipement.model';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';

// Enregistrer les composants Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-logistic-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, FormsModule],
  templateUrl: './logistic-dashboard.component.html',
  styleUrls: ['./logistic-dashboard.component.scss']
})
export class LogisticDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('equipmentChart') equipmentChartRef!: ElementRef<HTMLCanvasElement>;

  // Statistiques globales
  totalEquipments: number = 0;
  goodStateEquipments: number = 0;
  repairEquipments: number = 0;
  reserveEquipments: number = 0;
  materials: Equipement[] = [];

  equipmentChart: Chart | undefined;

  constructor(private logisticService: LogisticDashboardService) {}
  startEdit(material: Equipement): void {
    material.isEditing = true;
  }
  
  saveEdit(material: Equipement): void {
    material.isEditing = false;
  
    // Vérification du contenu envoyé
  console.log('Matériel envoyé au backend:', material);
  this.logisticService.updateEquipment(material.id, material).subscribe({
    next: (response: any) => {
      console.log('Réponse backend:', response);
         // Vérifier si la réponse contient toutes les propriétés mises à jour
         if (response.total !== material.total || 
          response.bon !== material.bon || 
          response.enReparation !== material.enReparation || 
          response.enPanne !== material.enPanne || 
          response.reserve !== material.reserve) {
        console.error('Les données ne sont pas mises à jour correctement');
      }
    },
    error: (err: any) => {
      console.error('Erreur lors de la mise à jour:', err);
    }
  });
  }

  ngOnInit() {
    this.loadEquipmentData();
    this.calculateGlobalStats();
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createDoughnutChart();
    }, 20);
  }

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
  
  

  getImagePath(type: string): string {
    const normalized = type.trim().toLowerCase();
    const imageMap: { [key: string]: string } = {
      'table': 'desk-chair.png',
      'chaise': 'chair.png',
      'projecteur': 'projector.png',
      'télévision': 'Tele.jpeg',
      'câblehdmi': 'cable.jpeg',
      'postedetravail': 'Postetravail.jpeg'
    };

    return 'assets/images/' + (imageMap[normalized] || 'default.png');
  }

  calculateGlobalStats() {
    this.totalEquipments = this.materials.reduce((sum, item) => sum + item.total, 0);
    this.goodStateEquipments = this.materials.reduce((sum, item) => sum + item.bon, 0);
    this.repairEquipments = this.materials.reduce((sum, item) => sum + item.enPanne, 0);
    this.reserveEquipments = this.materials.reduce((sum, item) => sum + item.reserve, 0);
  }

  createDoughnutChart() {
    if (!this.equipmentChartRef || !this.equipmentChartRef.nativeElement) {
      console.error('Canvas référence non trouvée');
      return;
    }

    const ctx = this.equipmentChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const chartData = this.materials.map(m => m.enReparation); // Utilisation de "enReparation"
    const chartLabels = this.materials.map(m => m.type);
    const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

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
                const total = (context.chart.data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  updateDoughnutChart() {
    if (!this.equipmentChart) return;

    const chartData = this.materials.map(m => m.enReparation);
    const chartLabels = this.materials.map(m => m.type);

    this.equipmentChart.data.labels = chartLabels;
    this.equipmentChart.data.datasets[0].data = chartData;
    this.equipmentChart.update();
  }

  calculatePercentage(total: number, value: number): string {
    return `${(value / total * 100).toFixed(0)}%`;
  }

  getRepairPercentage(material: any): string {
    const totalRepairs = this.materials.reduce((sum, item) => sum + item.enReparation, 0);
    if (totalRepairs === 0) return '0%';
    return `${Math.round((material.enReparation / totalRepairs) * 100)}%`;
  }
}
