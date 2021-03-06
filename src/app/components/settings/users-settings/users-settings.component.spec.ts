import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSettingsComponent } from './users-settings.component';

describe('PlexSettingsComponent', () => {
  let component: UsersSettingsComponent;
  let fixture: ComponentFixture<UsersSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
