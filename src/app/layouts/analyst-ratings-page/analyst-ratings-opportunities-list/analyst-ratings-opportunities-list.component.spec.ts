import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystRatingsOpportunitiesListComponent } from './analyst-ratings-opportunities-list.component';

describe('AnalystRatingsOpportunitiesListComponent', () => {
  let component: AnalystRatingsOpportunitiesListComponent;
  let fixture: ComponentFixture<AnalystRatingsOpportunitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystRatingsOpportunitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystRatingsOpportunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
