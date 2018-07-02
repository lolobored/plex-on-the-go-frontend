import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TvShowsListComponent} from './tvshows-list.component';


describe('TvShowsListComponent', () => {
  let component: TvShowsListComponent;
  let fixture: ComponentFixture<TvShowsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShowsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
