import { Component , Input} from '@angular/core';
import { Rapport } from '../../models/rapport';
import { RapportService } from '../../services/rapport.service';
import { Output , EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http : HttpClient){}


  onDownload(): void {
    const fileUrl = `http://localhost:9090/uploads/${this.rapport.url}`;
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = this.rapport.title + '.pdf'; 
    a.click();
  }
}
