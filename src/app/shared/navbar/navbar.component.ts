import {Component, NgModule, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemePickerModule} from '../theme-picker/theme-picker';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterModule, ThemePickerModule, CommonModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
})
export class NavBarModule {}
