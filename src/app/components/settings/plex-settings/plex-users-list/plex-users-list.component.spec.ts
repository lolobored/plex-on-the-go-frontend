import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PlexUsersListComponent} from './plex-users-list.component';


describe('PlexUsersListComponent', () => {
  let component: PlexUsersListComponent;
  let fixture: ComponentFixture<PlexUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlexUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlexUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
