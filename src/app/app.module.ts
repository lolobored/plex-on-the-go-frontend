import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import {HttpClientModule} from "@angular/common/http";

import { MoviesComponent } from './components/movies/movies.component';
import {MoviesService} from "./components/movies/movies.service";
import { MoviesTableComponent } from './components/movies/movies-table/movies-table.component';

import {
  MatPaginatorModule, MatTableModule, MatInputModule, MatSlideToggleModule, MatGridListModule,
  MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule, MatButtonModule, MatTabsModule
} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/login/user/user.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MoviesTableComponent,
    LoginComponent,
    UserComponent,
    MainMenuComponent,
    SettingsComponent
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
    BrowserAnimationsModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
