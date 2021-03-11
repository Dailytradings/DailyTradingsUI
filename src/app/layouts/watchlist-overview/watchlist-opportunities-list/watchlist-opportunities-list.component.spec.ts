import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistOpportunitiesListComponent } from './watchlist-opportunities-list.component';

describe('WatchlistOpportunitiesListComponent', () => {
  let component: WatchlistOpportunitiesListComponent;
  let fixture: ComponentFixture<WatchlistOpportunitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistOpportunitiesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistOpportunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
