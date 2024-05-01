import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { OffreComponent } from './offre/offre.component';
import { AjoutReclamationComponent } from './components/ajout-reclamation/ajout-reclamation.component';
import { HomeComponent } from './components/home/home.component';
import { ReclamationsComponent } from './components/reclamations copy/reclamations.component';
import { ModifierReclamationComponent } from './components/modifier-reclamation/modifier-reclamation.component';
import { AdminmainComponent } from './components/admin/adminmain/adminmain.component';

const routes: Routes = [
  
  { path: 'register', component: RegisterComponent },
  { path: 'offre', component: OffreComponent },
  { path: '', component: HomeComponent }, 
  { path: 'reclamations', component: ReclamationsComponent },
  { path: 'ajouter-reclamation', component: AjoutReclamationComponent },
  { path: 'modifier-reclamation/:id', component: ModifierReclamationComponent },
  { path: 'admin', component:  AdminmainComponent },
  { path: '**', redirectTo: '' } // Handle unknown routes
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
