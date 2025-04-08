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
import { UserProfilInterfaceComponent } from './pages/userProfil/user-profil-interface/user-profil-interface.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterComponent,SeConnecterComponent,HeaderComponent,DashboardComponent,MenuComponent,ReclamationHistoriqueComponent,AddClaimComponent,UserProfilInterfaceComponent,StatisticsComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
