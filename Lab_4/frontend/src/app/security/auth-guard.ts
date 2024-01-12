import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {CanActivate, Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    private router: Router = inject(Router);

    canActivate(): boolean {
        let isLoggedIn: boolean = JSON.parse(sessionStorage.getItem("isLoggedIn"));

        if (isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}