import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MoviesService } from './movies.service';
import { MoviesTableComponent} from "./movies-table/movies-table.component";
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatNativeDateModule,
  MatTableModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    CdkTableModule
  ],
  entryComponents: [MoviesTableComponent],
  declarations: [MoviesTableComponent],
  bootstrap: [MoviesTableComponent],
  providers: []
})
@Component({
  selector: 'app-movie',
  templateUrl: './movies.component.html',
  styles: []
})
export class  MoviesComponent implements OnInit {

  private movies: Array<any>;

  constructor(private router: Router, private movieService: MoviesService) {

  }

  ngOnInit() {
    this.movieService.getMovies()
      .subscribe( data => {
        this.movies = data;
      });
  };


}
