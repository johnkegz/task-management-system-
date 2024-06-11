import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form/task-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksRoutingModule } from './tasks-routing.module';


@NgModule({
  declarations: [
    TasksComponent, 
    TaskFormComponent,
  DashboardComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
