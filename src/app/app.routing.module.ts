import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import {SettingsComponent} from './components/settings/settings.component';
import {SettingsSidenav} from './components/settings/sidebar/settings-sidenav';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: MoviesComponent },
  { path: 'downloads', component: MoviesComponent },
  { path: 'sync', component: MoviesComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: ':section',
    component: SettingsSidenav,
    children: [
      {path: '', component: MoviesComponent},
      {path: 'settings/user', component: MoviesComponent}
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
