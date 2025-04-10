import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class SidebarComponent {
  menuItems = [
    { icon: 'person', label: 'Reclamation', active: false },
    { icon: 'dashboard', label: 'Dashboard', active: false },
    { icon: 'article', label: 'Generer Article', active: false },
    { icon: 'assessment', label: 'Rapport', active: false },
    { icon: 'local_shipping', label: 'Logistic', active: false }
  ];
}
