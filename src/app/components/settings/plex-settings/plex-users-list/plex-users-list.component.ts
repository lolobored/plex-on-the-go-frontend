import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatPaginator, MatSort, MatTableDataSource, } from '@angular/material';
import {PlexUserService} from '../plex-settings.service';
import {PlexUser} from '../../../../shared/models/plexusers/plexuser';
import {User} from '../../../../shared/models/user/user';

@NgModule({
  providers: [PlexUserService]
})

@Component({
  selector: 'app-plex-users-list',
  templateUrl: './plex-users-list.component.html',
  styleUrls: ['./plex-users-list.component.css']
})
export class PlexUsersListComponent implements OnInit {
  displayedColumns = ['server', 'username', 'delete'];
  dataSource: MatTableDataSource<PlexUser>;
  users: PlexUser[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private plexService: PlexUserService) {
// retrieving the list of users
    this.plexService.getUsers()
      .subscribe( (data: PlexUser[]) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * PlexUsers management
   */
  deletePlexUsers(plexUser: PlexUser): void {
  this.plexService.delete(plexUser.id)
     .subscribe( data => {
       this.users = this.users.filter(u => u !== plexUser);
       this.dataSource = new MatTableDataSource(this.users);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
  };

}
