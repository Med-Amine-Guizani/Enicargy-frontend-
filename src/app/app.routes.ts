import { Routes } from '@angular/router';
import { stat } from 'fs';
import { AddClaimComponent } from './pages/add-claim/add-claim.component';
import { RegisterComponent } from './pages/register/register.component';
import { SeConnecterComponent } from './pages/se-connecter/se-connecter.component';
import { StatisticsComponent } from './pages/userProfil/statistics/statistics.component';
import { UserProfilInterfaceComponent } from './pages/userProfil/user-profil-interface/user-profil-interface.component';


export const routes: Routes = [
    {path:'addclaim',component:AddClaimComponent},
    {path:'userInterface',component:UserProfilInterfaceComponent},
    {path:'seconnecter',component:SeConnecterComponent},
    {path:'stat',component:StatisticsComponent},
    {path:'register',component:RegisterComponent},
];
