import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {CoordinatesFormComponent} from "../input-form/input-form.component";

@Component({
    selector: "coordinate-plane",
    standalone: true,
    templateUrl: './coordinate-plane.component.html',
    styleUrls: ['./coordinate-plane.component.css']
})

export class CoordinatePlaneComponent {

    @ViewChild('coordinatePlane', {static: false})
    coordinatePlane: ElementRef;

    @Input()
    coordinatesFormComponent: CoordinatesFormComponent;

    isFormRValid(): boolean {
        return !(this.coordinatesFormComponent.coordsForm.controls['rValue'].hasError('rangeErr') ||
            this.coordinatesFormComponent.coordsForm.controls['rValue'].hasError('NaN') ||
            this.coordinatesFormComponent.coordsForm.controls['rValue'].hasError('empty'));
    }

    sendRequest(event) {
        let domPoint= new DOMPoint(event.clientX, event.clientY);

        // Coordinates translation for ViewBox sizing support
        let cursorPoint: DOMPoint =
            domPoint.matrixTransform(this.coordinatePlane.nativeElement.getScreenCTM().inverse());

        let rVal: number;
        if (this.isFormRValid()) {
            rVal = this.coordinatesFormComponent.coordsForm.get('rValue').value;
        }
        else {
            this.coordinatesFormComponent.coordsForm.controls['xCoord'].setValue("0");
            this.coordinatesFormComponent.coordsForm.controls['yCoord'].setValue("0");
            this.coordinatesFormComponent.submitBtn.nativeElement.click();
            return;
        }

        let scaleCoefficient = 220 / rVal;  // 220 because of 30px padding from the frame

        let areaClickedX = cursorPoint.x;   // Coords in svg area
        let areaClickedY = cursorPoint.y;

        let xCoord = ((areaClickedX - 250)/scaleCoefficient).toFixed(2); // Coords in coordinate system
        let yCoord = ((250 - areaClickedY)/scaleCoefficient).toFixed(2);

        this.coordinatesFormComponent.coordsForm.controls['xCoord'].setValue(xCoord);
        this.coordinatesFormComponent.coordsForm.controls['yCoord'].setValue(yCoord);

        console.log(xCoord);
        console.log(yCoord);
        console.log(rVal);
    }
}