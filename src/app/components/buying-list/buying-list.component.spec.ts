import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingListComponent } from './buying-list.component';

describe('BuyingListComponent', () => {
  let component: BuyingListComponent;
  let fixture: ComponentFixture<BuyingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
