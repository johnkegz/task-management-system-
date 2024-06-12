// tasks.state.ts
import { Task } from '../../../features/tasks/tasks.model';

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: any;
}

export const initialTasksState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};
