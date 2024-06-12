import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaskService } from '../../features/tasks/tasks.service';
import * as TasksActions from './tasks.actions';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => {
            return TasksActions.loadTasksSuccess({ tasks });
          }),
          catchError((error) => of(TasksActions.loadTasksFailure({ error })))
        )
      )
    );
  });
}
