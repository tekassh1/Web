import {catchError, map, Observable, of} from "rxjs";
import {AuthService} from "./auth.service";
import {inject, Injectable} from "@angular/core";
import {AuthResponse} from "../model/auth-data";

export const initializerFactory = (configService: InitializerService): (() => Observable<boolean>) => {
    return () => configService.initialize();
};

@Injectable({providedIn: 'root'})
export class InitializerService {

    authService: AuthService = inject(AuthService);

    initialize(): Observable<boolean> {
        console.log("get refresh called!");
        return this.authService.refreshToken().pipe(
            map((resp: AuthResponse) => {
                localStorage.setItem("accessToken", resp.accessToken);
                localStorage.setItem("refreshToken", resp.refreshToken);
                sessionStorage.setItem("isLoggedIn", "true");

                return true;
            }),
            catchError((error) => {
                sessionStorage.setItem("isLoggedIn", "false");
                localStorage.removeItem("username");
                return of(false);
            })
        );
    }
}