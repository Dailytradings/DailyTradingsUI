import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPredictionsFromWebsitesListComponent } from './other-predictions-from-websites-list.component';

describe('OtherPredictionsFromWebsitesListComponent', () => {
  let component: OtherPredictionsFromWebsitesListComponent;
  let fixture: ComponentFixture<OtherPredictionsFromWebsitesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPredictionsFromWebsitesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPredictionsFromWebsitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
