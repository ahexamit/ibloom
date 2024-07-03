import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-breadcum',
  templateUrl: './breadcum.component.html',
  styleUrls: ['./breadcum.component.scss'],
})
export class BreadcumComponent {
  HeaderItem: any;
  breadcrumbs!: string[];
  constructor(public sharedService: SharedService) {
    sharedService.getBreadcrumb().subscribe(breadcrumbs => {
      console.log(breadcrumbs);

      this.breadcrumbs = breadcrumbs;
    });

  }
}
