import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistOpportunitiesListComponent } from './wishlist-opportunities-list.component';

describe('WishlistOpportunitiesListComponent', () => {
  let component: WishlistOpportunitiesListComponent;
  let fixture: ComponentFixture<WishlistOpportunitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistOpportunitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistOpportunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
