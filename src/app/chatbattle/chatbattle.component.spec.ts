import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbattleComponent } from './chatbattle.component';

describe('ChatbattleComponent', () => {
  let component: ChatbattleComponent;
  let fixture: ComponentFixture<ChatbattleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbattleComponent]
    });
    fixture = TestBed.createComponent(ChatbattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
