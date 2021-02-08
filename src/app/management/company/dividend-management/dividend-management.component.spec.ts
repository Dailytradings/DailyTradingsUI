import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendManagementComponent } from './dividend-management.component';

describe('DividendManagementComponent', () => {
  let component: DividendManagementComponent;
  let fixture: ComponentFixture<DividendManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
