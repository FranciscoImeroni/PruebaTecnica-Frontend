import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/Login/login.component';
import { RegisterComponent } from './component/Register/register.component';
import { DashboardComponent } from './component/Dashboard/dashboard.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, LoginComponent, RegisterComponent, DashboardComponent, RouterModule],
})
export class AppComponent {
  currentView: string = 'dashboard'; 
}
