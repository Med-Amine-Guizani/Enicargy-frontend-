import { Component,Input } from '@angular/core';
import { LogisticsMonitoringBarComponent } from '../logistics-monitoring-bar/logistics-monitoring-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logistics-monitoring',
  standalone: true,
  imports: [LogisticsMonitoringBarComponent,CommonModule],
  templateUrl: './logistics-monitoring.component.html',
  styleUrl: './logistics-monitoring.component.css'
})
export class LogisticsMonitoringComponent {
  @Input() isLoading!:boolean;
  @Input() chairs!:number;
  @Input() tables!:number;
  @Input() projectors!:number;
 
  
}
