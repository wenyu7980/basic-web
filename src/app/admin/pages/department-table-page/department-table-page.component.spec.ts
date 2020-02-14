import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTablePageComponent } from './department-table-page.component';

describe('DepartmentTablePageComponent', () => {
  let component: DepartmentTablePageComponent;
  let fixture: ComponentFixture<DepartmentTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
