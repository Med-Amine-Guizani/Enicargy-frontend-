import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { SeConnecterComponent } from './pages/se-connecter/se-connecter.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './pages/userProfil/menu/menu.component';
import { ReclamationHistoriqueComponent } from './pages/userProfil/reclamation-historique/reclamation-historique.component';
import { AddClaimComponent } from './pages/add-claim/add-claim.component';
import { StatisticsComponent } from './pages/userProfil/statistics/statistics.component';
import { EnicargyDashboardComponent } from "./pages/enicargy-dashboard/enicargy-dashboard.component";
import{ArticleListComponent} from './pages/article-list/article-list.component';
import {AdminDashboardComponent} from './pages/admin-dashboard/admin-dashboard.component';
import{PageReclamationsComponent} from './pages/AdminPages/page-reclamations/page-reclamations.component';
import { LogisticDashboardComponent } from './pages/logistic-dashboard/logistic-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, SeConnecterComponent, HeaderComponent,PageReclamationsComponent, DashboardComponent, MenuComponent, ReclamationHistoriqueComponent, AddClaimComponent, StatisticsComponent, EnicargyDashboardComponent, ArticleListComponent,AdminDashboardComponent,LogisticDashboardComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
