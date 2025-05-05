import { Component,Input } from '@angular/core';
import { LogisticsMonitoringBarComponent } from '../logistics-monitoring-bar/logistics-monitoring-bar.component';
import { CommonModule } from '@angular/common';
import { LogisticDashboardService } from '../../services/logistic-dashboard.service';

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
 

  private totalChairs : number =0;
  private totalTables : number =0;
  private totalProjectors : number =0;

  constructor(private logisticsService : LogisticDashboardService){}

  ngOnInit() {
     this.logisticsService.getMaterials().subscribe(
      (data) => {
        this.totalChairs = data[0].total;
        this.totalTables = data[1].total;
        this.totalProjectors = data[2].total;
      }
    );
  }

  getTotalChairs() {
    return this.totalChairs;
  }

  getTotalTables() {
    return this.totalTables;
  }
  getTotalProjectors() {
    return this.totalProjectors;
  }
}
