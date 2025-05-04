import { Component, Input ,Output , EventEmitter } from '@angular/core';
import { Rapport } from '../../models/rapport';
import { RapportComponent } from '../rapport/rapport.component';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-rapports-list',
  standalone: true,
  imports: [RapportComponent,CommonModule],
  templateUrl: './rapports-list.component.html',
  styleUrl: './rapports-list.component.css'
})
export class RapportsListComponent {
     @Input () rapports: Rapport[] = [];
     @Input () year!:number;
     @Output() onDelete = new EventEmitter<number>();





    constructor() {}

     getYear(dateString: string): number {
      return new Date(dateString).getFullYear();
    }
    handleDelete(rapportId:number){
      this.onDelete.emit(rapportId);
    }

    @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;
  
  isAtStart = true;
  isAtEnd = false;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  checkScrollPosition() {
    const el = this.scrollContainer.nativeElement;
    const tolerance = 5; // Small threshold to account for rounding
    this.isAtStart = el.scrollLeft <= tolerance;
    this.isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance;
  }

  ngAfterViewInit() {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.checkScrollPosition();
    });
    this.checkScrollPosition();
  }


}
