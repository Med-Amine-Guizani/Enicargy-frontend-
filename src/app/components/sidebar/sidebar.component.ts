import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() navigateTo = new EventEmitter<string>();

  constructor(private authService :AuthService) {}

  selected: string = 'dashboard';

  sidebarOptions = [
    {
      label: 'Reclamation',
      path: 'reclamation',
      icon: 'https://img.icons8.com/color/48/complaint.png',
    },
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: 'https://img.icons8.com/color/48/combo-chart--v1.png',
    },
    {
      label: 'Generer un Article',
      path: 'article',
      icon: 'https://img.icons8.com/color/48/add-file.png',
    },
    {
      label: 'Rapports',
      path: 'rapport',
      icon: 'https://img.icons8.com/color/48/report-card.png',
    },
    {
      label: 'Logistic',
      path: 'logistic',
      icon: 'https://img.icons8.com/color/48/delivery.png',
    },
    
  ];



  

  select(path: string): void {
    this.selected = path;
    this.navigateTo.emit(path);
  }

  logout() {
    this.authService.logout();
  }


}
