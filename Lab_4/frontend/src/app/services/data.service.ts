import {inject, Injectable, OnInit} from "@angular/core";
import {PointResponse} from "../model/point-data";
import {HttpService} from "./http.service";
import {serverLoadPoints} from "../properties";

@Injectable({providedIn: 'root'})
export class DataService {
    private _requests: Array<PointResponse>;
    httpService: HttpService = inject(HttpService);

    constructor() {
        this.httpService.getData(serverLoadPoints).subscribe(
            {
                next: (resp: Array<PointResponse>) => {
                    this._requests = resp;
                },
                error: (err) => {
                    console.log(err);
                }
            }
        )
    }

    get data(): Array<PointResponse> {
        return this._requests;
    }

    set data(value: Array<PointResponse>) {
        this._requests = value;
    }

    addPoint(point: PointResponse) {
        this._requests.unshift(point);
    }
}