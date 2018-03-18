import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderModule, PageHeader} from './page-header';


describe('PageHeader', () => {
  let fixture: ComponentFixture<PageHeader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeaderModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeader);
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
