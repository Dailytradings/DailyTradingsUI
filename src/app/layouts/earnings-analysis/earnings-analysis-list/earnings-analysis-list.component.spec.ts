import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsAnalysisListComponent } from './earnings-analysis-list.component';

describe('EarningsAnalysisListComponent', () => {
  let component: EarningsAnalysisListComponent;
  let fixture: ComponentFixture<EarningsAnalysisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsAnalysisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
