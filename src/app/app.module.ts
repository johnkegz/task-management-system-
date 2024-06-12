import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/interceptors';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthModule } from './auth/auth.module';
import { NavbarModule } from './shared/navbar/navbar.module';

import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './store/tasks/tasks.reducer';
import { TasksEffects } from './store/tasks/tasks.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    NavbarModule,
    StoreModule.forRoot({
      user: userReducer,
      tasks: tasksReducer,
    }),

    EffectsModule.forRoot([UserEffects, TasksEffects]),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  exports: [ReactiveFormsModule],
})
export class AppModule {}
