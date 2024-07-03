import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, distinctUntilChanged, filter, map, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // private activeModal: NgbModalRef | undefined;
  private breadcrumbSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  param: any;
  base_url: String = environment.base_url;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      switchMap(async () => this.route.root),
      map(route => this.getBreadcrumbs(route))
    ).subscribe(breadcrumbs => {
      this.breadcrumbSubject.next(breadcrumbs);
    });
  }
  /**breadcome Title */
  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: string[] = []): string[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const routeBreadcrumb = child.snapshot.data['breadcrumb'];
      if (routeBreadcrumb) {
        breadcrumbs.push(routeBreadcrumb);
      }

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  getBreadcrumb(): Observable<string[]> {
    return this.breadcrumbSubject.asObservable();
  }
  /**searching globally */
  // private searchValueSubject = new BehaviorSubject<string>('');
  // public searchValue$ = this.searchValueSubject.asObservable();

  // setSearchValue(value: string): void {
  //   this.searchValueSubject.next(value);
  // }

  /**showSearch */
  // private showSearchSubject = new BehaviorSubject<string>('');
  // public showSearch$ = this.showSearchSubject.asObservable();
  // showSearch(value: any): void {
  //   this.showSearchSubject.next(value);
  // }

  /**breadcum title */
  private breadCum = new BehaviorSubject<string>('');
  public breadcumvalue$ = this.breadCum.asObservable();

  setBreadcum(value: any): void {
    if (value) {
      this.breadCum.next(value);
    }
  }
  /**file upload */
  public fileUpload(body: any) {
    let endPoint = 'uploads';
    const url = `${this.base_url}/${endPoint}`;
    return this.http.post(url, body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**upload file*/
  // imageUpload
  public imageUpload(event: any): Observable<any> {
    const file = event.target.files[0];
    let endPoint = 'uploads';
    const url = `${this.base_url}/${endPoint}`;

    if (file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post(url, formData).pipe(
        map((res) => {
          return res;
        })
      );
    } else {
      return throwError(() => {
        this.toastr.error('Please upload proper image..');
      });
    }
  }
  public audiovideo(event: any): Observable<any> {
    const file = event.target.files[0];
    let endPoint = 'uploads';
    const url = `${this.base_url}/${endPoint}`;

    if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post(url, formData).pipe(
        map((res) => {
          return res;
        })
      );
    } else {
      return throwError(() => {
        this.toastr.error('Please select a valid Audio And video file.');
      });
    }
  }

  // Scroll to top

  scrollToTop() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  /**modal */
  open(content: any, options?: any): void {
    this.modalService.open(content, options);
  }

  close(): void {
    this.modalService.dismissAll();
  }
  /**error message */
  errorMessage(message: string) {
    this.toastr.error(message);
  }
  successMessage(message: string) {
    this.toastr.success(message);
  }
}
