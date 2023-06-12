import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.log(error.error.message);
        this.dialog.open(ErrorDialogComponent, {
          panelClass: ['animate__animated', 'animate__slideInUp'],
          width: '350px',
          height: 'auto',
          disableClose: false,
          position: { right: '50%', top: '10rem' },
          data:error.error.message,
        })
        // alert(error.error.message);
        return throwError(error);
      })
    );
  }
}
