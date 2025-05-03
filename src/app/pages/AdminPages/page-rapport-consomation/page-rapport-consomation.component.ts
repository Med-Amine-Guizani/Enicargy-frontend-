import { Component } from '@angular/core';
import { RapportComponent } from '../../../components/rapport/rapport.component';
import { Rapport } from '../../../models/rapport';
import { RapportsListComponent } from '../../../components/rapports-list/rapports-list.component';
import { RapportService } from '../../../services/rapport.service';
import { CommonModule } from '@angular/common';
import { RapportFormComponent } from '../../../components/rapport-form/rapport-form.component';
import { RapportUploadPayload } from '../../../models/rapportuploadplayload';

@Component({
  selector: 'app-page-rapport-consomation',
  standalone: true,
  imports: [RapportComponent,RapportsListComponent,RapportFormComponent],
  templateUrl: './page-rapport-consomation.component.html',
  styleUrl: './page-rapport-consomation.component.css'
})
export class PageRapportConsomationComponent {
    rapports : Rapport[] =[ ]


    constructor(private RapportService: RapportService) { }
    ngOnInit() {
      this.loadRapports();
    }

    loadRapports(): void {
      this.RapportService.getRapports().subscribe({
        next: (rapports) => {
          this.rapports = rapports;
        },
        error: (error) => {
          console.error('Error loading articles:', error);
        }
      });
    }

    handleSubmit(data : RapportUploadPayload): void {
      this.RapportService.addReport(data).subscribe({
        next: () => {
          this.loadRapports();
        },
        error: (error) => {
          console.error('Error adding article:', error);
        }
      });
    }
    
  handleDelete(rapportId: number): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.RapportService.deleteRapport(rapportId).subscribe({
        next: () => {
          // Remove the article from the local array
          this.rapports = this.rapports.filter(a => a.id !== rapportId);
        },
        error: (error) => {
          console.error('Error deleting article:', error);
        }
      });
    }
  }


    
}
