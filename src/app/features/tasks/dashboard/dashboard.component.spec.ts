import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { TaskService } from '../tasks.service';
import { loadTasks } from '../../../core/store/tasks/tasks.actions';
import { AuthService } from '../../../core/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let taskService: TaskService;;
  let router: Router;
  let store: MockStore<any>;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('TaskService', ['deleteTask']);
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [DashboardComponent],
      providers: [
        { provide: TaskService, useValue: taskService },
        provideMockStore({}),
        AuthService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store) as MockStore<any>;
    fixture.detectChanges();
  });

  it('should load tasks on initialization', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks());
  });

  it('should dispatch loadTasks when loadTasks method is called', () => {
    spyOn(store, 'dispatch');
    component.loadTasks();
    expect(store.dispatch).toHaveBeenCalledWith(loadTasks());
  });

  it('should navigate to edit task route when editTask method is called', () => {
    spyOn(router, 'navigate');
    const taskId = 1;
    component.editTask(taskId);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks/edit', taskId]);
  });
});
