import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlexEditComponent } from './plex-edit.component';

describe('PlexEditComponent', () => {
  let component: PlexEditComponent;
  let fixture: ComponentFixture<PlexEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlexEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlexEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
