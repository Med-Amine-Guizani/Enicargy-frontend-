import { Component } from '@angular/core';
import { PageArticleComponent } from '../page-article/page-article.component';
import { PageRapportConsomationComponent } from '../page-rapport-consomation/page-rapport-consomation.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { LogisticDashboardComponent } from '../logistic-dashboard/logistic-dashboard.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-page-admin',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,PageArticleComponent,PageRapportConsomationComponent,AdminDashboardComponent,LogisticDashboardComponent,HeaderComponent],
  templateUrl: './page-admin.component.html',
  styleUrl: './page-admin.component.css'
})
export class PageAdminComponent {

  
  constructor(private router: Router) {}


  onSidebarNavigate(path: string): void {
    console.log(path);
    this.router.navigate(['/admin/'+path]);
  }
}

