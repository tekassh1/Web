import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class HttpService{

    frontHeaders: HttpHeaders;

    constructor(private http: HttpClient, private router: Router) {
        this.frontHeaders = new HttpHeaders()
            .set("Accept", "application/json")
            .set("Accept", "application/json");
    }

    postData(url: string, data: any): Observable<any> {
        return this.http.post(url, data, {headers: this.frontHeaders});
    }

    getData(url: string): Observable<any> {
        return this.http.get(url, {headers: this.frontHeaders});
    }
}