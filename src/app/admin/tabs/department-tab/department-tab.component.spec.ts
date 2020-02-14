import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTabComponent } from './department-tab.component';

describe('UserDepartmentTabComponent', () => {
  let component: DepartmentTabComponent;
  let fixture: ComponentFixture<DepartmentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
