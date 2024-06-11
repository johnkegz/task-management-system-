import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ExistingUser, initialUser } from '../../auth/user.model';
import { ErrorHandlingService } from '../../core/services/error-handling.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: ExistingUser = initialUser;
  title: string = 'Task Management System';

  constructor(private authService: AuthService, private router: Router, private errorHandlingService: ErrorHandlingService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.userSubject$.subscribe(user => {
      this.user = user;
    });
    this.checkAuthentication();
    
  }

  checkAuthentication(): void {
    const isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.isLoggedIn = true;
      const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUser(userId).subscribe({
        next: (user: ExistingUser) => {
          this.user = user;
        },
        error: (error: any) => {
          this.errorHandlingService.handleApiError(error);
        }
      });
    }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
