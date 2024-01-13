import {HttpClient, HttpHeaders} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {AuthRequest, AuthResponse, RefreshRequest} from "../model/auth-data";

@Injectable({providedIn: 'root'})
export class AuthService {
    serverAuthUrl: string = "http://localhost:8080/app/auth";
    serverRefreshUrl: string = "http://localhost:8080/app/refresh"

    http: HttpClient = inject(HttpClient);

    frontHeaders: HttpHeaders;

    constructor() {
        this.frontHeaders = new HttpHeaders()
            .set("Accept", "application/json")
            .set("Accept", "application/json");
    }

    performLogin(user: string, pass: string) {
        let data: AuthRequest = {authType: "login", username: user, password: pass};
        return this.http.post(this.serverAuthUrl, data, {headers: this.frontHeaders})
    }

    performSignup(user: string, pass: string) {
        let data: AuthRequest = {authType: "signup", username: user, password: pass};
        return this.http.post(this.serverAuthUrl, data, {headers: this.frontHeaders});
    }

    logout(user: string) {
        let data: AuthRequest = {authType: "logout", username: user, password: null};
        this.http.post(this.serverAuthUrl, data, {headers: this.frontHeaders})
            .subscribe({
                next: (resp: AuthResponse) => {
                    console.log(resp);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        sessionStorage.setItem("isLoggedIn", "false");
    }

    refreshToken() {
        console.log("Refresh token called!");

        let accessToken: string = localStorage.getItem("accessToken");
        let refreshToken: string = localStorage.getItem("refreshToken");
        let username: string = localStorage.getItem("username");

        let data: RefreshRequest = {username: username, accessToken: accessToken, refreshToken: refreshToken};

        const frontHeaders = new HttpHeaders()
            .set("Accept", "application/json")
            .set("Accept", "application/json");

        return this.http.post(this.serverRefreshUrl, data, {headers: frontHeaders});
    }
}