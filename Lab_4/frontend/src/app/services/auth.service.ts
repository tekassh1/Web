import {HttpClient, HttpHeaders} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {AuthRequest, AuthResponse, RefreshRequest} from "../model/auth-data";

@Injectable({providedIn: 'root'})
export class AuthService {
    serverMainUrl: string = "http://localhost:8080/app/main";
    serverAuthUrl: string = "http://localhost:8080/app/auth";
    serverRefreshUrl: string = "http://localhost:8080/app/refresh"

    http: HttpClient = inject(HttpClient);

    async pingAuth(): Promise<boolean> {
        const frontHeaders = new HttpHeaders()
            .set("Accept", "application/json")
            .set("Accept", "application/json");

        let res: boolean = false;

        await this.http.get(this.serverMainUrl).toPromise()
            .then((res) => {
                res = true;
            })
            .catch((err) => {
                this.refreshToken();
                let status: string = sessionStorage.getItem("isLoggedIn");
                if (status && status != "false")
                    res = true;
                else
                    res = false;
            });
        return res;
    }

    performLogin(user: string, pass: string) {
        let data: AuthRequest = {authType: "login", username: user, password: pass};

        const frontHeaders = new HttpHeaders()
            .set("Accept", "application/json")
            .set("Accept", "application/json");

        this.http.post(this.serverAuthUrl, data, {headers: frontHeaders})
            .subscribe({
                next: (resp: AuthResponse) => {
                    localStorage.setItem("accessToken", resp.accessToken);
                    localStorage.setItem("refreshToken", resp.refreshToken);
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("username", user);
                },
                error: (err) => {
                    let domparser: DOMParser = new DOMParser();
                    let msg: string = domparser.parseFromString(err.error, 'text/html').body.innerText;

                    sessionStorage.setItem("isLoggedIn", "false");
                    sessionStorage.removeItem("username");
                }
            });
    }

    performSignup(user: string, pass: string) {
        let data: AuthRequest = {authType: "signup", username: user, password: pass};

        const frontHeaders = new HttpHeaders()
            .set("Accept", "application/json")
            .set("Accept", "application/json");

        this.http.post(this.serverAuthUrl, data, {headers: frontHeaders})
            .subscribe({
                next: (resp: AuthResponse) => {
                    localStorage.setItem("accessToken", resp.accessToken);
                    localStorage.setItem("refreshToken", resp.refreshToken);
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("username", user);
                },
                error: (err) => {
                    let domparser: DOMParser = new DOMParser();
                    let msg: string = domparser.parseFromString(err.error, 'text/html').body.innerText;

                    sessionStorage.setItem("isLoggedIn", "false");
                    sessionStorage.removeItem("username");
                }
            });
    }

    refreshToken() {
        let accessToken: string = localStorage.getItem("accessToken");
        let refreshToken: string = localStorage.getItem("refreshToken");
        let username: string = localStorage.getItem("username");

        let data: RefreshRequest = {username: username, accessToken: accessToken, refreshToken: refreshToken};

        const frontHeaders = new HttpHeaders()
            .set("Accept", "application/json")
            .set("Accept", "application/json");

        this.http.post(this.serverRefreshUrl, data, {headers: frontHeaders})
            .subscribe({
                next: (resp: AuthResponse) => {
                    localStorage.setItem("accessToken", resp.accessToken);
                    localStorage.setItem("refreshToken", resp.refreshToken);

                    sessionStorage.setItem("isLoggedIn", "true");
                },
                error: () => {
                    sessionStorage.setItem("isLoggedIn", "false");
                    sessionStorage.removeItem("username");
                }
            });
    }
}