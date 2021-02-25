import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrideCornerNewsPanelComponent } from './pride-corner-news-panel.component';

describe('PrideCornerNewsPanelComponent', () => {
  let component: PrideCornerNewsPanelComponent;
  let fixture: ComponentFixture<PrideCornerNewsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrideCornerNewsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrideCornerNewsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
