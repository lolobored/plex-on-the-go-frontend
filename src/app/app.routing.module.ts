import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MoviesComponent} from './components/movies/movies.component';
import {SettingsComponent} from './components/settings/settings.component';
import {ElasticsearchComponent} from './components/settings/elasticsearch/elasticsearch.component';
import {PlexComponent} from './components/settings/plex/plex.component';
import {UsersSettingsComponent} from './components/settings/users-settings/users-settings.component';
import {UserEditComponent} from './components/settings/users-settings/users-edit/user-edit.component';
import {UserListComponent} from './components/settings/users-settings/users-list/users-list.component';
import {LdapSettingsComponent} from './components/settings/ldap-settings/ldap-settings.component';
import {MoviesListComponent} from './components/movies/movies-list/movies-list.component';
import {AppAuthGuard} from './app.authguard';
import {SyncComponent} from './components/sync/sync.component';

const routes: Routes = [
  {
    path: 'movies', component: MoviesComponent,
    canActivate: [AppAuthGuard],
    children: [
      {
        path: '', component: MoviesListComponent,
        canActivate: [AppAuthGuard]
      }
    ]
  },
  {
    path: 'tvshows', component: MoviesComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'downloads', component: MoviesComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'sync', component: SyncComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'profile', component: UserEditComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'settings', component: SettingsComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: ['admin']
    },
    children: [
      {
        path: 'users', component: UsersSettingsComponent,
        canActivate: [AppAuthGuard],
        children: [
          {
            path: '', component: UserListComponent,
            canActivate: [AppAuthGuard]
          },
          {
            path: 'add', component: UserEditComponent,
            canActivate: [AppAuthGuard]
          },
          {
            path: 'edit', children: [
              {
                path: ':id', component: UserEditComponent,
                canActivate: [AppAuthGuard]
              }
            ]
          }
        ]
      },
      {
        path: 'ldap', component: LdapSettingsComponent,
        canActivate: [AppAuthGuard]
      },
      {
        path: 'plex', component: PlexComponent,
        canActivate: [AppAuthGuard]
      },
      {
        path: 'plex-on-the-go', component: ElasticsearchComponent,
        canActivate: [AppAuthGuard]
      },
      {
        path: 'elasticsearch', component: ElasticsearchComponent,
        canActivate: [AppAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AppAuthGuard],
  declarations: []
})
export class AppRoutingModule {
}
