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