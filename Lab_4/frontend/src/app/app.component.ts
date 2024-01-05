import {Component, ViewChild} from "@angular/core";
import {HeaderComponent} from "./components/common/header/header.component";
import {FooterComponent} from "./components/common/footer/footer.component";
import {CoordinatesFormComponent} from "./components/main-page/input-form/input-form.component";
import {CoordinatePlaneComponent} from "./components/main-page/coordinate-plane/coordinate-plane.component";

import {NgForOf} from "@angular/common";
import {ResultTableComponent} from "./components/main-page/result-table/result-table.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {AuthPageComponent} from "./components/auth-page/auth-page.component";

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
        ResultTableComponent,
        MainPageComponent,
        AuthPageComponent
    ],
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    @ViewChild('formComponent', {static: false})
    formComponent: CoordinatesFormComponent;

    @ViewChild('coordinatePlaneComponent', {static: false})
    coordinatePlaneComponent: CoordinatePlaneComponent;
}