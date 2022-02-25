import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFinishModalComponent } from './confirm-finish-modal.component';

describe('ConfirmFinishModalComponent', () => {
  let component: ConfirmFinishModalComponent;
  let fixture: ComponentFixture<ConfirmFinishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmFinishModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFinishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
