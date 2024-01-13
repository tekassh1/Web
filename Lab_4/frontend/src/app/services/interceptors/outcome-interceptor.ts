import {
    HttpEvent, HttpHandler,
    HttpHandlerFn, HttpInterceptor,
    HttpInterceptorFn,
    HttpRequest
} from "@angular/common/http";

import {Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {Route, Router} from "@angular/router";

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

// @Injectable()
// export class OutcomeInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         let accessToken = localStorage.getItem("accessToken");
//         let username = localStorage.getItem("username");
//
//         if (accessToken) {
//             const cloned = req.clone({
//                 setHeaders: {
//                     username: `${username}`,
//                     accessToken: `${accessToken}`
//                 },
//             });
//             return next.handle(cloned);
//         } else {
//             return next.handle(req);
//         }
//     }
// }