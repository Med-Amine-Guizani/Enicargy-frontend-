import { Component , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogisticsMonitoringComponent } from '../../../components/logistics-monitoring/logistics-monitoring.component';
import { LogisticsService } from '../../../services/logistics.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-page-dashboard',
  standalone: true,
  imports: [LogisticsMonitoringComponent,CommonModule],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent {
  isLoading:boolean=true;
  chairs: number = 0;
  tables: number = 0;
  projectors: number = 0;

  constructor(private logisticsService: LogisticsService) {}

  ngOnInit(): void {
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
  }
}
