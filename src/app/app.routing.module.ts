import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ElasticsearchComponent} from './components/settings/elasticsearch/elasticsearch.component';
import {PlexComponent} from './components/settings/plex/plex.component';
import {UsersSettingsComponent} from './components/settings/users-settings/users-settings.component';
import {UserEditComponent} from './components/settings/users-settings/users-edit/user-edit.component';
import {UserListComponent} from './components/settings/users-settings/users-list/users-list.component';
import {LdapSettingsComponent} from './components/settings/ldap-settings/ldap-settings.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: MoviesComponent },
  { path: 'downloads', component: MoviesComponent },
  { path: 'sync', component: MoviesComponent },
  { path: 'settings', component: SettingsComponent,
    children: [
      {path: 'users', component: UsersSettingsComponent,
        children: [
          {path: '', component: UserListComponent},
          {path: 'add', component: UserEditComponent},
          {path: 'edit', children: [
              {path: ':id', component: UserEditComponent}
            ]}
        ]
      },
      {path: 'ldap', component: LdapSettingsComponent},
      {path: 'plex', component: PlexComponent},
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
