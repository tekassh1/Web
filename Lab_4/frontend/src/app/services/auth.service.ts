import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

type authData = {
    authType: string,
    username: string,
    password: string
}

export class loginService {
    serverUrl: string = "";

    constructor(private http: HttpClient) {}

    performLogin(user: string, pass: string): Observable<Object> {
        let data: authData = {authType: "login", username: user, password: pass};
        let headers: HttpHeaders = new HttpHeaders().set("Accept", "application/json");

        return this.http.post(this.serverUrl, data);
    }
}

export class signupService {
    serverUrl: string = "";

    constructor(private http: HttpClient) {}

    performSignup(user: string, pass: string): Observable<Object> {
        let data: authData = {authType: "signup", username: user, password: pass};
        let headers: HttpHeaders = new HttpHeaders().set("Accept", "application/json");

        return this.http.post(this.serverUrl, data);
    }
}