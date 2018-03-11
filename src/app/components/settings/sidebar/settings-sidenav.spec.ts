import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatSidenav} from '@angular/material';
import {SettingsSidenav, SettingsSidenavModule} from './settings-sidenav';

describe('SettingsSidenav', () => {
  let fixture: ComponentFixture<SettingsSidenav>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SettingsSidenavModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSidenav);
  });

  it('should close the sidenav on init', () => {
    const component = fixture.componentInstance;

    // Spy on window.mediaMatch and return stub
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true
    });

    fixture.detectChanges();
    async(() => {
      expect(component.sidenav instanceof MatSidenav).toBeTruthy();
      expect(component.isScreenSmall()).toBeTruthy();
      expect(component.sidenav.opened).toBe(false);
    });
  });

  it('should show a link for each item in doc items categories', () => {
    const component = fixture.componentInstance;

    fixture.detectChanges();
  });
});
