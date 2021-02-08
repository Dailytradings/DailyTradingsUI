import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageNewsPanelComponent } from './homepage-news-panel.component';

describe('HomepageNewsPanelComponent', () => {
  let component: HomepageNewsPanelComponent;
  let fixture: ComponentFixture<HomepageNewsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageNewsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageNewsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
