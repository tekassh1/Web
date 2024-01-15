import {inject, Injectable} from "@angular/core";
import {PointRequest} from "../model/point-data";
import {HttpService} from "./http.service";
import {serverCheckPointUrl} from "../properties";

@Injectable()
export class CheckPointService {
    httpService: HttpService = inject(HttpService);

    checkPoint(pointRequest: PointRequest) {
        return this.httpService.postData(serverCheckPointUrl, pointRequest);
    }
}