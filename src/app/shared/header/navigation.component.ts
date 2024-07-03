import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { SharedService } from '../shared.service'
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  searchBar: any;


  constructor(public sharedService: SharedService, public activateRoute: ActivatedRoute, public router: Router) {

  }
  ngOnInit(): void {
    this.sharedService.scrollToTop()
  }
  logout() {
    localStorage.clear()
    this.router.navigate(['signin'])
  }
  ngAfterViewInit() { }
}
