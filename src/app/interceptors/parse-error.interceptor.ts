import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertHandlerService } from '../services/alert-handler.service';

@Injectable()
export class ParseErrorInterceptor implements HttpInterceptor {
  constructor(private readonly _alertService: AlertHandlerService) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err) => {
        this._errorHandler(err);
        return throwError(() => err);
      })
    );
  }

  private _errorHandler(err: any) {
    let message = 'Internal Server Error!';
    if (err.error && err.error.message) message = err.error.message;
    this._alertService.sendAlert(message, true);
  }
}
