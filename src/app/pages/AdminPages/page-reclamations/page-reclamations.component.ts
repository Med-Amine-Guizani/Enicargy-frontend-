import { Component } from '@angular/core';
import { ReclamationComponent } from '../../../components/reclamation/reclamation.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { Reclamation } from '../../../models/reclamationvAdmin';
import { ReclamationAdminService } from '../../../services/reclamation-admin.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-page-reclamations',
  standalone: true,
  imports: [ReclamationComponent,HeaderComponent,CommonModule],
  templateUrl: './page-reclamations.component.html',
  styleUrl: './page-reclamations.component.css'
})
export class PageReclamationsComponent {
  reclamations: Reclamation[] = [];
  reclamationsEnAttente: Reclamation[] = [];
  reclamationsEnCours: Reclamation[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(private reclamationService: ReclamationAdminService) {}

  ngOnInit() {
    this.loadReclamations();
  }

  loadReclamations() {
    this.isLoading = true;
    this.reclamationService.getAllReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
        this.reclamationsEnAttente = data.filter(reclamation => reclamation.status === 'En attente');
        this.reclamationsEnCours = data.filter(reclamation => reclamation.status === 'En cours');
        this.isLoading = false;
        this.errorMessage = '';  // Clear any error message
      },
      error: (error) => {
        this.errorMessage = 'Failed to load reclamations, please try again later.';
        this.isLoading = false;
      }


    });
  }
  
}
