import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import {LoginComponent} from "./components/login/login.component";
import {SettingsComponent} from './components/settings/settings.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: MoviesComponent },
  { path: 'downloads', component: MoviesComponent },
  { path: 'sync', component: MoviesComponent },
  { path: 'settings', component: SettingsComponent }
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
