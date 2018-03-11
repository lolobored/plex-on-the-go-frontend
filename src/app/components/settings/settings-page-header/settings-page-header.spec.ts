import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SettingsHeaderModule, SettingsPageHeader} from './settings-page-header';


describe('SettingsPageHeader', () => {
  let fixture: ComponentFixture<SettingsPageHeader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SettingsHeaderModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageHeader);
  });

  it('should return the title', () => {
    const component = fixture.componentInstance;
    const title = 'foobar';
    fixture.detectChanges();
    component._componentPageTitle.title = title;
    expect(component.getTitle()).toEqual(title);
  });

  it('should emit a toggleSideNav event', () => {
    const component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.toggleSidenav, 'emit');
    fixture
      .nativeElement
      .querySelector('.sidenav-toggle')
      .click();
    expect(component.toggleSidenav.emit).toHaveBeenCalled();
  });
});
