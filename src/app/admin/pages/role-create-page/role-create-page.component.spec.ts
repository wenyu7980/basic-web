import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCreatePageComponent } from './role-create-page.component';

describe('RoleCreatePageComponent', () => {
  let component: RoleCreatePageComponent;
  let fixture: ComponentFixture<RoleCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
