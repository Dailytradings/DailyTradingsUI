import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousEarningsEffectsListComponent } from './previous-earnings-effects-list.component';

describe('PreviousEarningsEffectsListComponent', () => {
  let component: PreviousEarningsEffectsListComponent;
  let fixture: ComponentFixture<PreviousEarningsEffectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousEarningsEffectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousEarningsEffectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
