import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {authData} from "../model/auth-data";
import {Observable} from "rxjs";

@Injectable()
export class HttpService{
    serverUrl: string = "http://localhost:8080/app/";

    constructor(private http: HttpClient){ }

    postData(data: authData): Observable<any>{
        let reqHeaders: HttpHeaders = new HttpHeaders().set("Accept", "application/json");
        return this.http.post(this.serverUrl, data, {headers: reqHeaders});
    }
}