import {Component, ElementRef, inject, Input, ViewChild} from "@angular/core";
import {CoordinatesFormComponent} from "../input-form/input-form.component";
import {NgFor, NgIf, NgStyle} from "@angular/common";
import {DataService} from "../../../services/data.service";

@Component({
    selector: "coordinate-plane",
    standalone: true,
    templateUrl: './coordinate-plane.component.html',
    imports: [
        NgFor,
        NgIf,
        NgStyle
    ],
    styleUrls: ['./coordinate-plane.component.css'],
})

export class CoordinatePlaneComponent {

    @ViewChild('coordinatePlane', {static: false})
    coordinatePlane: ElementRef;

    @Input()
    coordinatesFormComponent: CoordinatesFormComponent;

    protected dataService: DataService = inject(DataService);

    isSmallFont: boolean = false;

    R: string;
    R2: string;
    mR: string;
    mR2: string;

    scale: number;

    setDefaultR() {
        this.R = "R";
        this.R2 = "R/2";
        this.mR = "-R";
        this.mR2 = "-R/2";
    }

    setR(r: number) {
        this.R = (r).toFixed(1).toString();
        this.R2 = (r / 2).toFixed(1).toString();
        this.mR = (-r).toFixed(1).toString();
        this.mR2 = (-r / 2).toFixed(1).toString();
    }

    // 5 - max img scale size (5/5 = 1)
    setPlaneScaleCoefficient(scale: number) {
        this.scale = scale/5;
    }

    sendRequest(event) {
        let domPoint = new DOMPoint(event.clientX, event.clientY);

        // Coordinates translation for ViewBox sizing support
        let cursorPoint: DOMPoint =
            domPoint.matrixTransform(this.coordinatePlane.nativeElement.getScreenCTM().inverse());

        let rVal: number;

        if (this.coordinatesFormComponent.isFormRValid()) {
            rVal = this.coordinatesFormComponent.coordsForm.get('rValue').value;
        } else {
            this.coordinatesFormComponent.coordsForm.controls['xCoord'].setValue("0");
            this.coordinatesFormComponent.coordsForm.controls['yCoord'].setValue("0");
            this.coordinatesFormComponent.submitBtn.nativeElement.click();
            return;
        }

        let scaleCoefficient: number = 220 / 5;  // 220 because of 30px padding from the frame (5 - default r size)

        let areaClickedX: number = cursorPoint.x;   // Coords in svg area
        let areaClickedY: number = cursorPoint.y;

        let xCoord: string = ((areaClickedX - 250) / scaleCoefficient).toFixed(1); // Coords in coordinate system
        let yCoord: string = ((250 - areaClickedY) / scaleCoefficient).toFixed(1);

        this.coordinatesFormComponent.coordsForm.controls['xCoord'].setValue(parseFloat(xCoord));
        this.coordinatesFormComponent.coordsForm.controls['yCoord'].setValue(parseFloat(yCoord));

        if (!this.coordinatesFormComponent.isXRangeValid() || !this.coordinatesFormComponent.isYRangeValid()) {
            return;
        }

        this.coordinatesFormComponent.submit();
    }
}