import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationAdminService } from '../../services/reclamation-admin.service';
import { Reclamation } from '../../models/reclamationvAdmin';

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent  {
  @Input() reclamation: Reclamation | null = null;
  imageLoading = true;

  constructor(private reclamationService: ReclamationAdminService) {}

  get actionButtonLabel(): string | null {
    switch (this.reclamation?.status) {
      case 'En_Attente':
        return 'Résoudre';
      case 'En_cours':
        return 'Résolu';
      default:
        return null;
    }
  }

  changeState(): void {
    let newState: Reclamation['status'] | null = null;

    if (this.reclamation?.status === 'En_Attente') {
      newState = 'En_cours';
    } else if (this.reclamation?.status === 'En_cours') {
      newState = 'Terminer';
    }

    if (newState && this.reclamation?.id) {
      this.reclamationService.updateReclamationState(this.reclamation.id, newState)
        .subscribe(
          updated => {
            if (this.reclamation) {
              this.reclamation.status = updated.status;
            }
            console.log('Reclamation state updated:', updated);
          },
          err => {
            console.error('Failed to update state:', err);
          }
        );
    }
  }

  get stateClass(): string {
    switch (this.reclamation?.status) {
      case 'En_Attente':
        return 'attente';
      case 'En_cours':
        return 'en-cours';
      case 'Terminer':
        return 'termine';
      default:
        return '';
    }
  }

  onLoad(): void {
    this.imageLoading = false;
  }

  onError(): void {
    this.imageLoading = false;
    if (this.reclamation) {
      this.reclamation.photoUrl = '/placeholder.jpg';
    }
  }
}
