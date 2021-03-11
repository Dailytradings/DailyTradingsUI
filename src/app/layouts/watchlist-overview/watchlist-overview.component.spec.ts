import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistOverviewComponent } from './watchlist-overview.component';

describe('WatchlistOverviewComponent', () => {
  let component: WatchlistOverviewComponent;
  let fixture: ComponentFixture<WatchlistOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchlistOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
