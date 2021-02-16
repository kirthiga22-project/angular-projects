import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClaimComponent } from './claim/claim.component';
import { ClaimstatusComponent } from './claimstatus/claimstatus.component';
import { ClaimslistComponent } from './claimslist/claimslist.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'addclaim', component: ClaimComponent
  },
  {
    path: 'editclaim/:id', component: ClaimComponent
  },
  {
    path: 'status/:id', component: ClaimstatusComponent
  },
  {
    path: 'claimslist', component: ClaimslistComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
