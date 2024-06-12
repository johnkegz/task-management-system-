import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ExistingUser, User, initialUser } from '../../auth/user.model';
import { ErrorHandlingService } from '../../core/services/error-handling.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/user/user.state';
import { selectIsLoggedIn, selectUser } from '../../store/user/user.selectors';
import { Observable } from 'rxjs';
import { logout } from '../../store/user/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: User | null = initialUser;
  title: string = 'Task Management System';

  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandlingService: ErrorHandlingService,
    private store: Store<UserState>
  ) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.user$.subscribe((user) => {
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
          },
        });
      }
    }
  }

  logout(): void {
    this.store.dispatch(logout());
    this.isLoggedIn = false;
  }
}
