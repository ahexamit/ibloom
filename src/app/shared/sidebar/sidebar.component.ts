import { Component, HostListener, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { SidebarItem } from '../../model/sidebar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: '.app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebarData: SidebarItem[] = ROUTES;
  sideBarIndex: any;
  sidebarVisible: boolean = false;
  activeMenuItem: string = ''; // Initialize to empty string or the title of the first menu item
  lastSegment!: string;
  selectedValue: string = 'gpt-4o'; // Initial selected value
  defautValue: string = 'gpt-4o';
  isDropdownVisible = false;
  allOptions = ['gpt-4o', 'gemini-1.5-flash'];
  options = this.allOptions.filter(option => option !== this.selectedValue);
  constructor(private routes: ActivatedRoute, private router: Router, private toaster:ToastrService) {}
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isDropdownVisible) {
      return;
    }
    
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown-container');
    
    if (dropdown && !dropdown.contains(target)) {
      this.hideDropdown();
    }
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getLastSegment();
      });

    // For initial load
    this.getLastSegment();
    // this.urlParamChanged();
  }
  selectValue(value: string) {
    console.log(value);
    this.selectedValue = value;
    // this.urlParamChanged();
    this.isDropdownVisible = false;
    this.hideDropdown();
    this.options = this.allOptions.filter(option => option !== this.selectedValue);
  }
  toggleDropdown(event: Event) {
    this.isDropdownVisible = !this.isDropdownVisible;
    event.stopPropagation();
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }

  setActiveMenuItem(title: string) {
    console.log(this.activeMenuItem,title)
    this.activeMenuItem = title;
  }
  getLastSegment(): void {
    let currentRoute = this.routes.root;
    let urlSegments: any = [];

    while (currentRoute.children.length > 0) {
      const childRoutes = currentRoute.children;
      currentRoute = childRoutes[0];
      urlSegments = [
        ...urlSegments,
        ...currentRoute.snapshot.url.map((segment) => segment.path),
      ];
    }
    this.lastSegment = urlSegments.length
      ? urlSegments[urlSegments.length - 1]
      : '';
    this.activeMenuItem = this.lastSegment;
    this.setActiveMenuItem(this.lastSegment);
    // if (this.lastSegment === 'jobs') {
      // this.urlParamChanged();
    // }
  };

  urlParamChanged(): void {
    // if (this.lastSegment === 'jobs') {
      const currentParams = { ...this.routes.snapshot.queryParams };
      currentParams['model'] = this.selectedValue;
      this.router.navigate([], {
        relativeTo: this.routes,
        queryParams: currentParams,
        queryParamsHandling: 'merge',
      });
    };
    logout() {
      this.router.navigate(['/login']);
      localStorage.setItem('token', '');
      localStorage.clear();
      this.toaster.success('Logged Out');
    }
  
}
