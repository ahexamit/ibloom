import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(request.url.includes('interview_bot')){
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => this.toastr.error('Something went wrong please try again...'));
        })
      );
    }
   else {
  Notiflix.Loading.circle();
  return next.handle(request).pipe(
    finalize(() => Notiflix.Loading.remove()),
    catchError((error: HttpErrorResponse) => {
      if (error.error.error) {
        this.toastr.error(error.error.error);
      } else {
        this.toastr.error('Something went wrong, please try again...');
      }

      return throwError(() => new Error(error.error.error || 'Something went wrong, please try again...'));
    })
  );
}

   
  }
}
