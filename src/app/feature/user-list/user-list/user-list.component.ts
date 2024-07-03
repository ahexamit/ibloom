import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { FeatureService } from '../../feature.service';
import { Subscription } from 'rxjs';
import { Userlist } from 'src/app/model/userlist';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  userData: Userlist[] = [];

  private searchParameter!: Subscription;

  pageNumber: number = 1;
  searchValue: any = '';
  pageLimit!: number;
  toTalCount!: number;

  constructor(
    private featureService: FeatureService,
    private sharedservice: SharedService,
    public activateRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.data.subscribe((res) => {
      this.sharedservice.setBreadcum(res);
    });
    this.getUserData();
  }

  paginate(event: any) {
    this.pageNumber = event.page + 1;
    this.pageLimit = event.rows;
    if (event) {
      this.getUserData();
    }
  }

  getUserData() {
    this.featureService
      .userList(this.pageNumber, this.searchValue, this.pageLimit)
      .subscribe((res) => {
        this.toTalCount = res.totalCount;
        if (res.users && res.users.length > 0) {
          this.userData = res.users.map((x: Userlist) => {
            return {
              ['First Name']: x.firstname,
              ['Last Name']: x.lastname,
              ['Email Address']: x.email,
              ['Year Of Birth']: x.birth_year,
            };
          });
        } else {
          this.userData = [];
        }
      });
  }
  ngOnDestroy(): void {
  }
}
