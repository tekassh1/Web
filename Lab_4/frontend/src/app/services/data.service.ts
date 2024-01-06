import {Injectable} from "@angular/core";

export type pointResult = {
    x: string,
    y: string,
    r: string,
    res: boolean,
    reqDate: string,
    execTime: string
};

@Injectable({providedIn: 'root'})
export class DataService {
    private _requests: Array<pointResult> = new Array<pointResult>();

    get data(): Array<pointResult> {
        return this._requests;
    }

    set data(value: Array<pointResult>) {
        this._requests = value;
    }

    addPoint(point: pointResult) {
        this._requests.unshift(point);
    }
}