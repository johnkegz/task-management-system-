import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserState } from '../../store/user/user.state';
import { Store } from '@ngrx/store';
import { login } from '../../store/user/user.actions';
import { Observable } from 'rxjs';
import { selectUserError } from '../../store/user/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<UserState>
  ) {
    this.error$ = this.store.select(selectUserError)
  }

  ngOnInit(): void {
    this.initForm();

    this.error$.subscribe((er) => {
        console.log("{{ error.message ? error.message : error }}", er)
    });
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      const data = { user: {username, password} };
      this.store.dispatch(login(data));
    }
  }
}
