
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import {HttpClientModule} from '@angular/common/http';

import { MoviesComponent } from './components/movies/movies.component';
import {MoviesService} from './components/movies/movies.service';
import { MoviesTableComponent } from './components/movies/movies-table/movies-table.component';

import {
  MatPaginatorModule, MatTableModule, MatInputModule, MatSlideToggleModule, MatGridListModule,
  MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule, MatButtonModule, MatTabsModule, MatExpansionModule, MatSidenavModule,
  MatSortModule, MatDividerModule, MatOptionModule, MatSelectModule, MatListModule
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
import { PlexComponent } from './components/settings/plex/plex.component';
import { UsersSettingsComponent } from './components/settings/users-settings/users-settings.component';
import {UserListComponent} from './components/settings/users-settings/users-list/users-list.component';
import {UsersService} from './components/settings/users-settings/users-settings.service';
import {UserEditComponent} from './components/settings/users-settings/users-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MoviesTableComponent,
    LoginComponent,
    UserComponent,
    MainMenuComponent,
    SettingsComponent,
    ElasticsearchComponent,
    PlexComponent,
    UsersSettingsComponent,
    UserEditComponent,
    UserListComponent
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
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatTabsModule,
    MatSidenavModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NavBarModule,
    ThemePickerModule,
    SettingsSidenavModule
  ],
  providers: [MoviesService,
    UsersService,
    StyleManager,
    ThemeStorage,
    ComponentPageTitle],
  bootstrap: [AppComponent]
})
export class AppModule { }
