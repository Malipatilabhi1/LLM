import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBasedComponent } from './task-based.component';

describe('TaskBasedComponent', () => {
  let component: TaskBasedComponent;
  let fixture: ComponentFixture<TaskBasedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskBasedComponent]
    });
    fixture = TestBed.createComponent(TaskBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
