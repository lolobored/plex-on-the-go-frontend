
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import {HttpClientModule} from "@angular/common/http";

import { MoviesComponent } from './components/movies/movies.component';
import {MoviesService} from "./components/movies/movies.service";
import { MoviesTableComponent } from './components/movies/movies-table/movies-table.component';

import {
  MatPaginatorModule, MatTableModule, MatInputModule, MatSlideToggleModule, MatGridListModule,
  MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule, MatButtonModule, MatTabsModule, MatExpansionModule
} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/login/user/user.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SettingsComponent } from './components/settings/settings.component';
import { ElasticsearchComponent } from './components/settings/elasticsearch/elasticsearch.component';
import {NavBarModule} from './shared/navbar/navbar.component';
import {ThemePickerModule} from './shared/theme-picker';
import {ThemeStorage} from './shared/theme-picker/theme-storage/theme-storage';
import {StyleManager} from './shared/style-manager';



@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MoviesTableComponent,
    LoginComponent,
    UserComponent,
    MainMenuComponent,
    SettingsComponent,
    ElasticsearchComponent
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
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NavBarModule,
    ThemePickerModule
  ],
  providers: [MoviesService,
    StyleManager,
    ThemeStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
