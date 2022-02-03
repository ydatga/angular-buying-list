import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateBuyingListComponent } from './modal-create-buying-list.component';

describe('ModalCreateBuyingListComponent', () => {
  let component: ModalCreateBuyingListComponent;
  let fixture: ComponentFixture<ModalCreateBuyingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateBuyingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateBuyingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
