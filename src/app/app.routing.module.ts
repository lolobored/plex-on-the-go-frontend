import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import {SettingsComponent} from './components/settings/settings.component';
import {SettingsSidenav} from './components/settings/sidebar/settings-sidenav';
import {ElasticsearchComponent} from './components/settings/elasticsearch/elasticsearch.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: MoviesComponent },
  { path: 'downloads', component: MoviesComponent },
  { path: 'sync', component: MoviesComponent },
  { path: 'settings', component: SettingsComponent,
    children: [
      {path: 'plex-on-the-go', component: ElasticsearchComponent},
      {path: 'elasticsearch', component: ElasticsearchComponent}
    ]}
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
