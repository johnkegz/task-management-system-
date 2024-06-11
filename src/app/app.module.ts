import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule,

    // MatInputModule,
    // MatButtonModule,
    // MatSelectModule,
    // MatCardModule,
    // MatFormFieldModule,
    // MatIconModule,
    
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
    // MatToolbarModule
],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
  exports: [
    // MatInputModule,
    // MatButtonModule,
    // MatSelectModule,
    // MatCardModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatToolbarModule,
    ReactiveFormsModule
  ]
})
export class AppModule {}
