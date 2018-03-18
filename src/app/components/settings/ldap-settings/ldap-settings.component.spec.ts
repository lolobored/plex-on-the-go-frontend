import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdapSettingsComponent } from './ldap-settings.component';

describe('LdapSettingsComponent', () => {
  let component: LdapSettingsComponent;
  let fixture: ComponentFixture<LdapSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdapSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdapSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
