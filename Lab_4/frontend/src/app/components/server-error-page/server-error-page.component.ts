import {Component} from "@angular/core";
import {RouterModule} from "@angular/router";

@Component({
    selector: "error-page",
    standalone: true,
    imports: [
        RouterModule
    ],
    styleUrls: ['./server-error-page.component.css'],
    template: `
        <div id="mainPanel">
            <p id="errorCode">{{ errorCode }}</p>
            <p id="labelText">{{ labelText }}</p>
            <p id="additionalText">{{ additionalText }}</p>
            <button id="goBackBtn" type="button" [routerLink]="homePageLink">Go to homepage</button>
        </div>
    `
})

export class ServerErrorPageComponent {
    homePageLink: string = "";
    errorCode: string = "500";
    labelText: string = "Oops!";
    additionalText: string = "Server error. Please, try later";
}