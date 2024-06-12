// tasks.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadTasks, loadTasksSuccess, loadTasksFailure } from './tasks.actions';
import { TasksState, initialTasksState } from './tasks.state';

export const tasksReducer = createReducer(
  initialTasksState,
  on(loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    loading: false,
  })),
  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
