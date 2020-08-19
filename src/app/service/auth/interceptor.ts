import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
  })
  export class InterceptorService implements HttpInterceptor{

    constructor(private cookie: CookieService,
        private router:Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userSession = this.cookie.get('srvpriv');

        if (userSession) {
            const const_Session = JSON.parse(atob(userSession));
            request = request.clone({ headers: request.headers.set('Authorization', "Bearer "+const_Session.token) });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
              if(error.status === 403){
                swal({
                    title: '¡Error!',
                    text: 'Se ha vencido la sesión',
                    icon: 'warning'
                })
                this.router.navigate(['/']);
                return throwError(null);
              }
              return throwError(error);
            }));
    }

  }