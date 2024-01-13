import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
    HttpStatusCode
} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../auth.service";
import {AuthResponse} from "../../model/auth-data";

export const incomeInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn):
    Observable<HttpEvent<any>> => {

    let router: Router = inject(Router);
    let authService: AuthService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status == 0 || error.status >= 500)
                router.navigate(['serverError'])
            else if (error.status == HttpStatusCode.Unauthorized) {
                authService.refreshToken().pipe(
                    map((resp: AuthResponse) => {
                        localStorage.setItem("accessToken", resp.accessToken);
                        localStorage.setItem("refreshToken", resp.refreshToken);
                        sessionStorage.setItem("isLoggedIn", "true");
                        return true;
                    }),
                    catchError(() => {
                        sessionStorage.setItem("isLoggedIn", "false");
                        localStorage.removeItem("username");
                        router.navigate(['login'])
                        return of(false);
                    })
                );
            }
            let domparser: DOMParser = new DOMParser();
            let msg = domparser.parseFromString(error.error, 'text/html').body.innerText;
            return throwError(new Error(msg));
        })
        ,)
    };