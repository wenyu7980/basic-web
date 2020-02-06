import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTablePageComponent } from './role-table-page.component';

describe('RoleTablePageComponent', () => {
  let component: RoleTablePageComponent;
  let fixture: ComponentFixture<RoleTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
