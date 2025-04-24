import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { Reclamation } from '../../../models/reclamation';
import { ReclamationsService } from '../../../services/reclamations.service';
import { StatutReclamation } from '../../../models/reclamationstatus';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  reclamationChart!: Chart;

  constructor(private reclamationService: ReclamationsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.reclamationService.getClaims().subscribe(reclamations => {
      if (reclamations.length === 0) {
        // Créer une fausse donnée par défaut
        const chartData = {
          labels: ['Aucune réclamation'],
          values: [1],
          colors: ['#E0E0E0']
        };
        this.initReclamationChart(chartData);
      } else {
        const chartData = this.processReclamations(reclamations);
        this.initReclamationChart(chartData);
      }
    });
  }
  

  processReclamations(reclamations: Reclamation[]): {
    labels: string[],
    values: number[],
    colors: string[]
  } {
    const countMap = new Map<StatutReclamation, number>();

    // Couleurs personnalisées par statut
    const colorMap: Record<StatutReclamation, string> = {
      [StatutReclamation.TERMINEE]: '#9886FF',
      [StatutReclamation.EN_COURS]: '#1BF3EF',
      [StatutReclamation.EN_ATTENTE]: '#FD95A2',
      [StatutReclamation.REFUSEE]: '#A9C1FD'
    };

    // Compter les réclamations par statut
    reclamations.forEach(rec => {
      countMap.set(rec.statut, (countMap.get(rec.statut) || 0) + 1);
    });

    const labels = Array.from(countMap.keys()).map(key => key);
    const values = Array.from(countMap.values());
    const colors = labels.map(label => colorMap[label]);

    return { labels, values, colors };
  }

  initReclamationChart(data: { labels: string[], values: number[], colors: string[] }): void {
    if(typeof window==='undefined') return;
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
            text: 'Reclamation par statut',
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

    this.reclamationChart = new Chart(ctx, config);
  }
}
