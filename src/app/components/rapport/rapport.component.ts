import { Component , Input} from '@angular/core';
import { Rapport } from '../../models/rapport';
import { RapportService } from '../../services/rapport.service';
import { Output , EventEmitter } from '@angular/core';
@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [],
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.css'
})
export class RapportComponent {
  @Input({required:true}) rapport! : Rapport; 
  @Output() onDelete = new EventEmitter<number>();
  imagePath = 'assets/images/pdf.png';
}
