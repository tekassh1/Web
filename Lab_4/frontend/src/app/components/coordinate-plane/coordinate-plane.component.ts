import {Component, Input, ViewChild} from "@angular/core";
import {CoordinatesFormComponent} from "../input-form/input-form.component";

@Component({
    selector: "coordinate-plane",
    standalone: true,
    templateUrl: './coordinate-plane.component.html',
    styleUrls: ['./coordinate-plane.component.css']
})

export class CoordinatePlaneComponent {

    @ViewChild('coordinatePlane', {static: false})
    coordinatePlane: SVGGraphicsElement;

    @Input()
    coordinatesForm: CoordinatesFormComponent;

    sendRequest(event) {
        // let domPoint: DOMPoint = new DOMPoint(event.clientX, event.clientY);
        //
        // // Coordinates translation for ViewBox sizing support
        // let cursorPoint: DOMPoint = domPoint.matrixTransform(this.coordinatePlane.getScreenCTM().inverse());
        //
        // let isRValid: boolean = this.coordinatesForm.isRSelected();
        // let rVal;
        //
        // if (rCheck[0]) {
        //     rVal = rCheck[1];
        // }
        // else {
        //     xField.value = 0
        //     yField.value = 0;
        //     sendRequestButton.click();
        //     return;
        // }
        //
        // let scaleCoefficient = 220 / rVal;  // 220 because of 30px padding from the frame
        //
        // let areaClickedX = cursorPoint.x;   // Coords in svg area
        // let areaClickedY = cursorPoint.y;
        //
        // let xCoord = ((areaClickedX - 250)/scaleCoefficient).toFixed(2); // Coords in coordinate system
        // let yCoord = ((250 - areaClickedY)/scaleCoefficient).toFixed(2);
        //
        // xField.value = xCoord;
        // yField.value = yCoord;
        //
        // sendRequestButton.click();
    }
}