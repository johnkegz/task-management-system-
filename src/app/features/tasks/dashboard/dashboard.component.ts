import { Component, OnInit } from '@angular/core';
import { TaskService } from '../tasks.service';
import { Task } from '../tasks.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTasks } from '../../../core/store/tasks/tasks.actions';
import { selectTasks } from '../../../core/store/tasks/tasks.selectors';
import { Observable } from 'rxjs';
import { TasksState } from '../../../core/store/tasks/tasks.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tasks$: Observable<any>;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private store: Store<TasksState>
  ) {
    this.tasks$ = this.store.select(selectTasks);
  }

  ngOnInit(): void {
    this.loadTasks();
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
}
