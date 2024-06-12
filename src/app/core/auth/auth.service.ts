import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExistingUser, User, initialUser } from './user.model';
import { ErrorHandlingService } from '../services/error-handling.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<ExistingUser>(initialUser);
  userSubject$: Observable<ExistingUser> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlingService: ErrorHandlingService
  ) {}

  getUsers() {
    return this.http.get<ExistingUser[]>(`${this.apiUrl}`);
  }

  register(userData: User) {
    return this.http.post<User>(`${this.apiUrl}`, userData);
  }

  logout(): Observable<null> {
    localStorage.removeItem('userId');
    this.isLoggedInSubject.next(false);
    this.userSubject.next(initialUser);
    this.router.navigate(['/auth/login']);
    return of(null)
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('userId') ? true : false;
  }

  getUser(userId: string) {
    return this.http.get<ExistingUser>(`${this.apiUrl}/${userId}`);
  }
}
