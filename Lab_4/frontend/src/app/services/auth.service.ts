import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";

type authData = {
    authType: string,
    username: string,
    password: string
}

// type serverResponse = {
//     opCode: string,
//     message: string,
//     jwt: string
// }

@Injectable()
export class AuthService {
    serverUrl: string = "";

    http: HttpClient = inject(HttpClient);

    performLogin(user: string, pass: string): Observable<any> {
        let data: authData = {authType: "login", username: user, password: pass};
        let reqHeaders: HttpHeaders = new HttpHeaders().set("Accept", "application/json");

        return this.http.post(this.serverUrl, data, {headers: reqHeaders});
    }

    performSignup(user: string, pass: string): Observable<any> {
        let data: authData = {authType: "signup", username: user, password: pass};
        let reqHeaders: HttpHeaders = new HttpHeaders().set("Accept", "application/json");

        return this.http.post(this.serverUrl, data, {headers: reqHeaders});
    }
}