import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as UserActions from './user.actions';
import { ExistingUser } from '../../auth/user.model';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(action =>
        this.authService.getUser(action.userId).pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );

login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(action =>
        this.authService.getUsers().pipe(
          map((users: ExistingUser[]) => {
            const user = users.find(
              (u) =>
                u.username === action.user.username &&
                u.password === action.user.password
            );
            if (user) {
              localStorage.setItem('userId', user.id);
              return UserActions.loadUserSuccess({ user });
            } else {
              return UserActions.loadUserFailure({ error: 'Invalid username or password' });
            }
          }),
          catchError(error => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );

navigateAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserSuccess),
      map(() => {
        this.router.navigate(['/tasks/dashboard']);
      })
    ),
    { dispatch: false }
  );


logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => {
            UserActions.logoutSuccess();
            return this.router.navigate(['/auth/login']);
          })
        )
      )
    ), { dispatch: false }
  );
}
