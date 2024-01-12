import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from "@angular/common/http";

import {Observable} from "rxjs";

export const outcomeInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn):
    Observable<HttpEvent<any>> => {
    let accessToken = localStorage.getItem("accessToken");
    let username = localStorage.getItem("username");

    if (accessToken) {
        const cloned = req.clone({
            setHeaders: {
                username: `${username}`,
                accessToken: `${accessToken}`
            },
        });
        return next(cloned);
    } else {
        return next(req);
    }
};