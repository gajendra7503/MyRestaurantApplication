import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
// import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './authguard.guard';
import { RestaurantDashComponent } from './restaurant-dash/restaurant-dash.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'Dashboard', component: RestaurantDashComponent , canActivate:[AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
