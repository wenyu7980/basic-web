import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSavePageComponent } from './role-save-page.component';

describe('RoleSavePageComponent', () => {
  let component: RoleSavePageComponent;
  let fixture: ComponentFixture<RoleSavePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSavePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSavePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
