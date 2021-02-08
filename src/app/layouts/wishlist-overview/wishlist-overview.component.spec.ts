import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistOverviewComponent } from './wishlist-overview.component';

describe('WishlistOverviewComponent', () => {
  let component: WishlistOverviewComponent;
  let fixture: ComponentFixture<WishlistOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
