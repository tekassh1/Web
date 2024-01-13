import {HttpClient, HttpHeaders} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {AuthRequest, AuthResponse, RefreshRequest} from "../model/auth-data";
import {HttpService} from "./http.service";

@Injectable({providedIn: 'root'})
export class AuthService {
    serverAuthUrl: string = "http://localhost:8080/app/auth";
    serverRefreshUrl: string = "http://localhost:8080/app/refresh"

    httpService: HttpService = inject(HttpService);

    performLogin(user: string, pass: string) {
        let data: AuthRequest = {authType: "login", username: user, password: pass};
        return this.httpService.postData(this.serverAuthUrl, data);
    }

    performSignup(user: string, pass: string) {
        let data: AuthRequest = {authType: "signup", username: user, password: pass};
        return this.httpService.postData(this.serverAuthUrl, data);
    }

    logout(user: string) {
        let data: AuthRequest = {authType: "logout", username: user, password: null};
        sessionStorage.setItem("isLoggedIn", "false");
        return this.httpService.postData(this.serverAuthUrl, data);
    }

    refreshToken() {
        let accessToken: string = localStorage.getItem("accessToken");
        let refreshToken: string = localStorage.getItem("refreshToken");
        let username: string = localStorage.getItem("username");

        let data: RefreshRequest = {username: username, accessToken: accessToken, refreshToken: refreshToken};

        return this.httpService.postData(this.serverRefreshUrl, data);
    }
}