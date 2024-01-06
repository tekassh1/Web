import {Component, ViewChild} from "@angular/core";
import {CoordinatesFormComponent} from "./input-form/input-form.component";
import {CoordinatePlaneComponent} from "./coordinate-plane/coordinate-plane.component";
import {ResultTableComponent} from "./result-table/result-table.component";
import {DataService} from "../../services/data.service";

@Component({
    selector: "main-page",
    standalone: true,
    imports: [
        CoordinatesFormComponent,
        CoordinatePlaneComponent,
        ResultTableComponent
    ],
    providers: [DataService],
    styleUrls: ['./main-page.component.css'],
    template: `
        <div id="controlPanel">
            <main-form
                #formComponent
                [coordinatePlaneComponent]="this.coordinatePlaneComponent">
            </main-form>
        </div>

        <div id="secondaryPanel">
            <coordinate-plane
                #coordinatePlaneComponent
                [coordinatesFormComponent]="this.formComponent">
            </coordinate-plane>

            <result-table>
            </result-table>
        </div>
    `
})

export class MainPageComponent {
    @ViewChild('formComponent', {static: false})
    formComponent: CoordinatesFormComponent;

    @ViewChild('coordinatePlaneComponent', {static: false})
    coordinatePlaneComponent: CoordinatePlaneComponent;
}