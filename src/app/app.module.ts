import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FullComponent } from './layouts/full/full.component';
import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { HeaderInterceptor } from './utills/interceptor/header.interceptor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ErrorInterceptor } from './utills/interceptor/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuillModule } from 'ngx-quill';
import { BreadcumComponent } from "./shared/breadcum/breadcum.component"
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavigationComponent,
    FullComponent,
    SidebarComponent,
    BreadcumComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Approutes, { useHash: true }),
    ToastrModule.forRoot(),
    CKEditorModule,
    QuillModule,
    ProgressSpinnerModule,
    NgbCollapseModule,
    SidebarModule 
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
