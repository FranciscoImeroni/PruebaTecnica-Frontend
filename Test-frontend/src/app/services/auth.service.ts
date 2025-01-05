import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: { email: string; password: string }) {
    return this.http.post('/api/register', userData);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>('/api/login', credentials).subscribe(
      (response) => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/dashboard']);
      }
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
