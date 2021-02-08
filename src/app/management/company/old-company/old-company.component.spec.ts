import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldCompanyComponent } from './old-company.component';

describe('OldCompanyComponent', () => {
  let component: OldCompanyComponent;
  let fixture: ComponentFixture<OldCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
