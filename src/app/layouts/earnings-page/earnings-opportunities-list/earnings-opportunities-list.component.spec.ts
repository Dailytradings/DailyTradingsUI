import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsOpportunitiesListComponent } from './earnings-opportunities-list.component';

describe('EarningsOpportunitiesListComponent', () => {
  let component: EarningsOpportunitiesListComponent;
  let fixture: ComponentFixture<EarningsOpportunitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsOpportunitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsOpportunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
