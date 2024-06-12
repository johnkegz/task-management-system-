import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './tasks.service';
import { Task } from './tasks.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });



  it('should create a new task', () => {
    const newTask: Task = { id: 3, title: 'Task 3', description: 'Description 3', user: 'User 3', status: 'Pending' };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(newTask);
  });

  it('should update an existing task', () => {
    const updatedTask: Task = { id: 3, title: 'Updated Task', description: 'Updated Description', user: 'User 1', status: 'Completed' };

    service.updateTask(1, updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(updatedTask);
  });

    it('should retrieve all tasks', () => {
  const tasks: Task[] = [{ id: 1, title: 'Updated Task', description: 'Updated Description', user: 'User 1', status: 'Completed' }];

  service.getTasks().subscribe((responseTasks: Task[]) => {
    expect(responseTasks.length).toBe(1);
    expect(responseTasks).toEqual(tasks);
  });

  const req = httpMock.expectOne('http://localhost:3000/tasks');
  expect(req.request.method).toBe('GET');
  req.flush(tasks);
});
});
