import { Routes } from '@angular/router';
import { AddClaimComponent } from './pages/add-claim/add-claim.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { SeConnecterComponent } from './pages/se-connecter/se-connecter.component';
import { UserProfilInterfaceComponent } from './pages/userProfil/user-profil-interface/user-profil-interface.component';
import { EnicargyDashboardComponent } from './pages/enicargy-dashboard/enicargy-dashboard.component';
import { PageAdminComponent } from './pages/AdminPages/page-admin/page-admin.component';
import { PageReclamationsComponent } from './pages/AdminPages/page-reclamations/page-reclamations.component';
import { AdminDashboardComponent } from './pages/AdminPages/admin-dashboard/admin-dashboard.component';
import { PageArticleComponent } from './pages/AdminPages/page-article/page-article.component';
import { LogisticDashboardComponent } from './pages/AdminPages/logistic-dashboard/logistic-dashboard.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { PageRapportConsomationComponent } from './pages/AdminPages/page-rapport-consomation/page-rapport-consomation.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'seconnecter',pathMatch:'full'},
    {path:'addclaim',component:AddClaimComponent,canActivate: [AuthGuard]},
    {path:'userInterface',component:UserProfilInterfaceComponent,canActivate: [AuthGuard]},
    {path:'seconnecter',component:SeConnecterComponent},
    {path:'register',component:RegisterComponent},
    {path:'articlelist',component:ArticleListComponent,canActivate: [AuthGuard]},
    {path:'consommation',component:EnicargyDashboardComponent,canActivate: [AuthGuard]},
    {path:'admin',component:PageAdminComponent,canActivate: [AuthGuard], data: { requiresAdmin: true },
        children:[
            {path:'',redirectTo:'dashboard',pathMatch:'full'},
            {path:'dashboard',component:AdminDashboardComponent},
            {path:'reclamation',component:PageReclamationsComponent},
            {path:'article',component:PageArticleComponent},
            {path:'logistic',component:LogisticDashboardComponent},
            {path:'rapport',component:PageRapportConsomationComponent},
        ]
    }

];
