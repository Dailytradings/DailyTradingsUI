import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEarningsComponent } from './upcoming-earnings.component';

describe('UpcomingEarningsComponent', () => {
  let component: UpcomingEarningsComponent;
  let fixture: ComponentFixture<UpcomingEarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingEarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
