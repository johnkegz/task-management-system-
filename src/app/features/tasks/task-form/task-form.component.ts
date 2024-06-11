import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../tasks.model';
import { TaskService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  // ngOnInit(): void {
  //   this.taskForm = this.fb.group({
  //     title: ['', Validators.required],
  //     description: ['', Validators.required]
  //   });
  // }

  ngOnInit(): void {
    this.initForm();
    // Check if the component is used for editing
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      if (taskId) {
        this.taskId = taskId;
        this.taskService.getTaskById(taskId).subscribe(task => {
          this.taskForm.patchValue(task); // Prefill form with task data
        });
      }
    });
  }


  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      user: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;

      if (this.taskId) {
        this.taskService.updateTask(this.taskId, task).subscribe((response: Task) => {
          console.log('Task updated:', response);
          this.router.navigate(['/tasks/dashboard']); // Redirect after successful update
        });
      } else {

      this.taskService.createTask(task).subscribe({
        next: (newTask: Task) => {
          console.log(newTask)
          this.taskForm.reset();
          this.router.navigate(['/tasks/dashboard']);
        },
        error: (error: any) => {
          console.error('Error creating task', error);
        }
      });
    }}
  }

  onCancel(): void {
    this.taskForm.reset();
  }
}
