import { Component, OnInit } from '@angular/core';
import { TaskService } from '../tasks.service';
import { Task } from '../tasks.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTasks } from '../../../core/store/tasks/tasks.actions';
import { selectTasks } from '../../../core/store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { TasksState } from '../../../core/store/tasks/tasks.state';
import { AuthService } from '../../../core/auth/auth.service';
import { ExistingUser } from '../../../core/auth/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tasks$: Observable<any>;
  users: ExistingUser[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private store: Store<TasksState>,
    private authService: AuthService
  ) {
    this.tasks$ = this.store.select(selectTasks);
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks(): void {
    this.store.dispatch(loadTasks());
  }

  editTask(taskId: number): void {
    this.router.navigate(['/tasks/edit', taskId]);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  getUserName(userId: string): string {
    const user = this.users.find((u) => u.id == userId);
    return user ? user.username : '-';
  }
}
