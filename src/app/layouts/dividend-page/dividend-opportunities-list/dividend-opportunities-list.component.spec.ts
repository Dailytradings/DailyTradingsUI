import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendOpportunitiesListComponent } from './dividend-opportunities-list.component';

describe('DividendOpportunitiesListComponent', () => {
  let component: DividendOpportunitiesListComponent;
  let fixture: ComponentFixture<DividendOpportunitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendOpportunitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendOpportunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
