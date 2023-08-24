import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelZooDetailsComponent } from './model-zoo-details.component';

describe('ModelZooDetailsComponent', () => {
  let component: ModelZooDetailsComponent;
  let fixture: ComponentFixture<ModelZooDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelZooDetailsComponent]
    });
    fixture = TestBed.createComponent(ModelZooDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
