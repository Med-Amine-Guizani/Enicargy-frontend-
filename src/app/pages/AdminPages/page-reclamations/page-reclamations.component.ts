import { Component } from '@angular/core';
import { ReclamationComponent } from '../../../components/reclamation/reclamation.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { Reclamation } from '../../../models/reclamationvAdmin';
import { ReclamationAdminService } from '../../../services/reclamation-admin.service';
import { CommonModule } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';

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
  @ViewChild('scrollWrapper') scrollWrapper!: ElementRef<HTMLElement>;
  constructor(private reclamationService: ReclamationAdminService) {}

  ngOnInit() {
    this.loadReclamations();
  }

  loadReclamations() {
    this.isLoading = true;
    this.reclamationService.getAllReclamations().subscribe({
      next: (data) => {
        this.reclamations = data;
        this.reclamationsEnAttente = data.filter(reclamation => reclamation.status === 'En_Attente');
        this.reclamationsEnCours = data.filter(reclamation => reclamation.status === 'En_cours');
        this.isLoading = false;
        this.errorMessage = '';  // Clear any error message
        console.log('Reclamations loaded:', this.reclamations);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load reclamations, please try again later.';
        this.isLoading = false;
      }


    });
  }

  

  scrollLeft() {
    this.scrollWrapper.nativeElement.scrollBy({
      left: -300, // Adjust scroll amount as needed
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollWrapper.nativeElement.scrollBy({
      left: 300, // Adjust scroll amount as needed
      behavior: 'smooth'
    });
  }

  @ViewChild('attenteScrollWrapper') attenteScrollWrapper!: ElementRef<HTMLElement>;
  
  isAttenteAtStart = true;
  isAttenteAtEnd = false;
  private attenteTouchStartX = 0;

  // Scroll functions
  scrollAttenteLeft() {
    this.attenteScrollWrapper.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollAttenteRight() {
    this.attenteScrollWrapper.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  // Check scroll position
  checkAttenteScrollPosition() {
    const el = this.attenteScrollWrapper.nativeElement;
    this.isAttenteAtStart = el.scrollLeft <= 10; // Small threshold
    this.isAttenteAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
  }

  // Touch events for mobile
  handleAttenteTouchStart(event: TouchEvent) {
    this.attenteTouchStartX = event.touches[0].clientX;
  }

  handleAttenteTouchMove(event: TouchEvent) {
    const touchX = event.touches[0].clientX;
    const diff = this.attenteTouchStartX - touchX;
    this.attenteScrollWrapper.nativeElement.scrollLeft += diff;
    this.attenteTouchStartX = touchX;
  }

  ngAfterViewInit() {
    // Set up scroll event listener
    this.attenteScrollWrapper.nativeElement.addEventListener('scroll', () => {
      this.checkAttenteScrollPosition();
    });
    
    // Initial check
    this.checkAttenteScrollPosition();
  }
  
  
}
