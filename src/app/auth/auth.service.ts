// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.authStatus.next(true);
      this.router.navigate(['/dashboard']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authStatus.asObservable();
  }
}
