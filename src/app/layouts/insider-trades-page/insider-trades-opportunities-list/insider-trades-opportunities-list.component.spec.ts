import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsiderTradesOpportunitiesListComponent } from './insider-trades-opportunities-list.component';

describe('InsiderTradesOpportunitiesListComponent', () => {
  let component: InsiderTradesOpportunitiesListComponent;
  let fixture: ComponentFixture<InsiderTradesOpportunitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsiderTradesOpportunitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsiderTradesOpportunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
