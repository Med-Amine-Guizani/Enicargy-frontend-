import { Component, Input ,Output , EventEmitter } from '@angular/core';
import { Rapport } from '../../models/rapport';
import { RapportComponent } from '../rapport/rapport.component';
import { CommonModule } from '@angular/common';
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
}
