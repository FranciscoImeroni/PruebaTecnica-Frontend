import { Routes } from '@angular/router';
import { LoginComponent } from './component/Login/login.component';
import { RegisterComponent } from './component/Register/register.component';
import { DashboardComponent } from './component/Dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
