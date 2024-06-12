import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../tasks.model';
import { TaskService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { min } from './task-form.custom-validators';
import { ErrorHandlingService } from '../../../core/services/error-handling.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;
  users: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private errorHandlingService: ErrorHandlingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
    
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      if (taskId) {
        this.taskId = taskId;
        this.taskService.getTaskById(taskId).subscribe(task => {
          this.taskForm.patchValue(task);
        });
      }
    });
  }


  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required, min(4)],
      description: ['', Validators.required, min(8)],
      user: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;

      if (this.taskId) {
        this.taskService.updateTask(this.taskId, task).subscribe({
        next: (response: Task) => {
          this.router.navigate(['/tasks/dashboard']);
        },
        error: (error: any) => {
          this.errorHandlingService.handleApiError(error);
        }
      });
      } else {

      this.taskService.createTask(task).subscribe({
        next: (newTask: Task) => {
          this.taskForm.reset();
          this.router.navigate(['/tasks/dashboard']);
        },
        error: (error: any) => {
          this.errorHandlingService.handleApiError(error);
        }
      });
    }}
  }

  onCancel(): void {
    this.taskForm.reset();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
