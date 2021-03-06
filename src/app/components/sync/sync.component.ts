import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {KeycloakService} from 'keycloak-angular';
import {UsersService} from '../settings/users-settings/users-settings.service'
import {Conversion} from '../../shared/models/conversion/conversion';
import {ConversionsService} from './conversions.service';
import {User} from '../../shared/models/user/user';

@NgModule({
  providers: [UsersService, ConversionsService]
})

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

  conversions: Conversion[];
  dataSource: MatTableDataSource<Conversion>;
  displayedColumns = ['title', 'progress', 'remaining', 'elapsed'];

  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  username: string;

  constructor(private conversionService: ConversionsService, private keycloakService: KeycloakService,
              private userService: UsersService) {
    this.username = this.keycloakService.getUsername();

    this.conversionService.getConversions(this.username).subscribe((data: Conversion[]) => {
      this.conversions = data;
      this.dataSource = new MatTableDataSource(this.conversions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

}
