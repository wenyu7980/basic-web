import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepartmentTabComponent } from './user-department-tab.component';

describe('UserDepartmentTabComponent', () => {
  let component: UserDepartmentTabComponent;
  let fixture: ComponentFixture<UserDepartmentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDepartmentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDepartmentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
