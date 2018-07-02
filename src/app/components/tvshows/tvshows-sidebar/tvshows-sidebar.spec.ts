import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatSidenav} from '@angular/material';
import {TvShowsSidebar, TvShowsSidebarModule} from './tvshows-sidebar';

describe('TvShowsSidebar', () => {
  let fixture: ComponentFixture<TvShowsSidebar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TvShowsSidebarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsSidebar);
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
