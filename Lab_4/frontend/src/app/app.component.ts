import {Component, ViewChild} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CoordinatesFormComponent} from "./components/input-form/input-form.component";
import {CoordinatePlaneComponent} from "./components/coordinate-plane/coordinate-plane.component";

import {NgForOf} from "@angular/common";
import {ResultTableComponent} from "./components/result-table/result-table.component";

@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        HeaderComponent,
        FooterComponent,
        CoordinatesFormComponent,
        CoordinatePlaneComponent,
        NgForOf,
        ResultTableComponent
    ],
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    @ViewChild('formComponent', {static: false})
    formComponent: CoordinatesFormComponent;
}