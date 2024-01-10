import {HttpClient, HttpHeaders} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {AuthRequest, AuthResponse} from "../model/auth-data";

@Injectable({providedIn: "root"})
export class AuthService {
    serverAuthUrl: string = "http://localhost:8080/app/auth";

    isLoggedIn: boolean = false;

    accessToken: string;

    http: HttpClient = inject(HttpClient);

    performLogin(user: string, pass: string) {
        let data: AuthRequest = {authType: "login", username: user, password: pass};

        this.http.post(this.serverAuthUrl, data)
            .subscribe((resp: AuthResponse) => {
            console.log(resp);
        });
    }

    performSignup(user: string, pass: string) {
        let data: AuthRequest = {authType: "signup", username: user, password: pass};

        this.http.post(this.serverAuthUrl, data)
            .subscribe((resp: AuthResponse) => {
                console.log(resp);
            });
    }
}