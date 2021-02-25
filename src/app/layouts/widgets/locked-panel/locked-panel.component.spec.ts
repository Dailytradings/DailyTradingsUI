import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedPanelComponent } from './locked-panel.component';

describe('LockedPanelComponent', () => {
  let component: LockedPanelComponent;
  let fixture: ComponentFixture<LockedPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockedPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
