import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ComponentHeaderModule, SettingsPageHeader} from './settings-page-header';


describe('ComponentPageHeader', () => {
  let fixture: ComponentFixture<SettingsPageHeader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentHeaderModule],
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
