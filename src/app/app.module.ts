
import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import {HttpClientModule} from '@angular/common/http';


import {
  MatPaginatorModule,
  MatTableModule,
  MatInputModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatExpansionModule,
  MatSidenavModule,
  MatSortModule,
  MatDividerModule,
  MatOptionModule,
  MatSelectModule,
  MatListModule,
  MatCheckboxModule,
  MatSliderModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/login/user/user.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ElasticsearchComponent } from './components/settings/elasticsearch/elasticsearch.component';
import {NavBarModule} from './shared/navbar/navbar.component';
import {ThemePickerModule} from './shared/theme-picker';
import {ThemeStorage} from './shared/theme-picker/theme-storage/theme-storage';
import {StyleManager} from './shared/style-manager';
import {ComponentPageTitle} from './shared/page-title/page-title';
import {SettingsSidenavModule} from './components/settings/sidebar/settings-sidenav';
import { UsersSettingsComponent } from './components/settings/users-settings/users-settings.component';
import {UserListComponent} from './components/settings/users-settings/users-list/users-list.component';
import {UserEditComponent} from './components/settings/users-settings/users-edit/user-edit.component';
import { LdapSettingsComponent } from './components/settings/ldap-settings/ldap-settings.component';
import { MoviesComponent } from './components/movies/movies.component';
import {MoviesSidebarModule} from './components/movies/movies-sidebar/movies-sidebar';
import {MoviesListComponent} from './components/movies/movies-list/movies-list.component';
import {initializer} from './utils/app-init';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import { SyncComponent } from './components/sync/sync.component';
import {ConversionsService} from './components/sync/conversions.service';
import {PlexService} from './components/settings/users-settings/plex.service';
import {UserServiceAuth} from './utils/user-service-auth';
import {PlexSettingsComponent} from './components/settings/plex-settings/plex-settings.component';
import {PlexUserService} from './components/settings/plex-settings/plex-settings.service';
import {PlexUsersListComponent} from './components/settings/plex-settings/plex-users-list/plex-users-list.component';
import {PlexEditComponent} from './components/settings/plex-settings/plex-edit/plex-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    MainMenuComponent,
    SettingsComponent,
    ElasticsearchComponent,
    UsersSettingsComponent,
    UserEditComponent,
    PlexEditComponent,
    UserListComponent,
    PlexUsersListComponent,
    LdapSettingsComponent,
    MoviesComponent,
    MoviesListComponent,
    PlexSettingsComponent,
    SyncComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatTabsModule,
    MatSidenavModule,
    MatDividerModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NavBarModule,
    ThemePickerModule,
    SettingsSidenavModule,
    MoviesSidebarModule,
    KeycloakAngularModule
  ],
  providers: [StyleManager,
    ThemeStorage,
    ComponentPageTitle,
    ConversionsService,
    UserServiceAuth,
    PlexService,
    PlexUserService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
