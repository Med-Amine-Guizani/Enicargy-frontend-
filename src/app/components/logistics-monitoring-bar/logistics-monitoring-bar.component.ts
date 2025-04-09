import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-logistics-monitoring-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logistics-monitoring-bar.component.html',
  styleUrl: './logistics-monitoring-bar.component.css'
})
export class LogisticsMonitoringBarComponent {
  @Input() icon!:string;
  @Input() max!: number;
  @Input() min!: number;
  @Input() current!: number;

  get warning(): boolean {
    return this.current < this.min;
  }

  get progressPercent(): number {
    return Math.min((this.current / this.max) * 100, 100);
  }

  get minPercent(): number {
    return Math.min((this.min / this.max) * 100, 100);
  }
  get remainingPercent(): number {
    return 100 - this.progressPercent;
  }
}
