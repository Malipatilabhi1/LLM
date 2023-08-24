import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelZooComponent } from './model-zoo.component';

describe('ModelZooComponent', () => {
  let component: ModelZooComponent;
  let fixture: ComponentFixture<ModelZooComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelZooComponent]
    });
    fixture = TestBed.createComponent(ModelZooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
