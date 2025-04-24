import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationAdminService } from '../../services/reclamation-admin.service';
import { Reclamation } from '../../models/reclamationvAdmin';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent  {
  @Input() reclamation: Reclamation | null = null;
  @Output() statusAdvanced = new EventEmitter<Reclamation>();
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
    if (!this.reclamation?.id) return;
  
    this.reclamationService.updateReclamationState(this.reclamation.id).subscribe({
      next: (updated) => {
        console.log("child reclamation with id :", this.reclamation?.id , "is sending signal to parent");
        this.statusAdvanced.emit(updated);
        if (this.reclamation) {
          this.reclamation.status = updated.status;
        }
        console.log('Reclamation state updated:', updated);
        this.statusAdvanced.emit(updated);
      },
      error: (err) => {
        console.error('Failed to update state:', err);
      }
    });
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
      this.reclamation.photoUrl = 'assets/images/placeholder.jpg';
    }
  }
}
