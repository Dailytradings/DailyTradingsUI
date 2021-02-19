import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousDividendEffectsListComponent } from './previous-dividend-effects-list.component';

describe('PreviousDividendEffectsListComponent', () => {
  let component: PreviousDividendEffectsListComponent;
  let fixture: ComponentFixture<PreviousDividendEffectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousDividendEffectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousDividendEffectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
