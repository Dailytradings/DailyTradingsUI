import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramMenuComponent } from './diagram-menu.component';

describe('DiagramMenuComponent', () => {
  let component: DiagramMenuComponent;
  let fixture: ComponentFixture<DiagramMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
