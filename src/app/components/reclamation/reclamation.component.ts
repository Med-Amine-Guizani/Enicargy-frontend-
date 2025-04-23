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
export class ReclamationComponent implements OnInit {
  @Input() reclamation: Reclamation | null = null;
  imageLoading = true;

  constructor(private reclamationService: ReclamationAdminService) {}

  ngOnInit(): void {
    if (this.reclamation?.id) {
      this.reclamation.photoUrl = this.reclamationService.getImageUrl(this.reclamation.id);
    }
  }

  get actionButtonLabel(): string | null {
    switch (this.reclamation?.status) {
      case 'En attente':
        return 'Résoudre';
      case 'En cours':
        return 'Résolu';
      default:
        return null;
    }
  }

  changeState(): void {
    let newState: Reclamation['status'] | null = null;

    if (this.reclamation?.status === 'En attente') {
      newState = 'En cours';
    } else if (this.reclamation?.status === 'En cours') {
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
      case 'En attente':
        return 'attente';
      case 'En cours':
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
