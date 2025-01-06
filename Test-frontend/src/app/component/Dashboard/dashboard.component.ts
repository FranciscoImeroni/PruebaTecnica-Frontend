import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This content is protected and only visible to authenticated users.</p>
      <button mat-raised-button color="warn" (click)="logout()">Logout</button>
    </div>
  `,
  styles: [
    `
      div {
        text-align: center;
        margin-top: 50px;
      }
      button {
        margin-top: 20px;
      }
    `,
  ],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule],
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}

