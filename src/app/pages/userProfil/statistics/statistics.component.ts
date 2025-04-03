import { Component, OnChanges, SimpleChanges, Input, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { Reclamation } from '../../../reclamation';
import { NgChartsModule,BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule,NgChartsModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'] 
})

export class StatisticsComponent  {
  @Input() reclamations: Reclamation[] = [];
  public isBrowser: boolean;
  public chartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };
  public chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
  };
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
 
  
  updateChartData(): void {
    const stats = {
      Terminée: 0,
      'En cours': 0,
      Refusée: 0,
      'En attente': 0
    };

    this.reclamations.forEach(r => stats[r.statut]++);

    this.chartData = {
      labels: Object.keys(stats),
      datasets: [{
        data: Object.values(stats),
        backgroundColor: ['#6a5acd', '#00bfff', '#ff6347', '#ffd700']
      }]
    };
  }

  }

