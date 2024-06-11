import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post<{ token: string }>('/api/login', { username, password }).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.authStatus.next(true);
      this.router.navigate(['/tasks']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
