import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CoordinatePlaneComponent} from "../coordinate-plane/coordinate-plane.component";

interface validationObj {
    [s: string]: boolean;
}

type pointResult = {
    x: string,
    y: string,
    r: string,
    res: boolean,
    reqDate: string,
    execTime: string
};

@Component({
    selector: "main-form",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf],
    styleUrls: ["input-form.css"],
    templateUrl: './input-form.component.html'
})

export class CoordinatesFormComponent implements OnInit {
    coordsForm: FormGroup;

    // move to service
    requests: Array<pointResult> = [];

    @ViewChild("submitBtn", {static: false})
    submitBtn: ElementRef;

    @Input()
    coordinatePlaneComponent: CoordinatePlaneComponent;

    ngOnInit(): void {
        this.coordsForm = new FormGroup({
            "xCoord": new FormControl("", [Validators.required, this.xCoordValidator.bind(this)]),
            "yCoord": new FormControl("", [Validators.required, this.yCoordValidator.bind(this)]),
            "rValue": new FormControl("", [Validators.required, this.rValueValidator.bind(this)])
        });
    }

    submittedTrigger: boolean = false;

    submit() {
        console.log("submit called!");
        this.submittedTrigger = true;

        if (!this.coordsForm.invalid) {
            console.log("submit valid!");

            let xCoord: string = this.coordsForm.get('xCoord').value;
            let yCoord: string = this.coordsForm.get('yCoord').value;
            let rValue: string = this.coordsForm.get('rValue').value;

            // magic service call...

            this.requests.unshift({
                x: xCoord,
                y: yCoord,
                r: rValue.toString(),
                res: true,
                reqDate: "04.01.2024",
                execTime: "3"
            });

        } else {
            console.log("submit invalid!");
            console.log(this.coordsForm.get('xCoord').value);
            console.log(this.coordsForm.get('yCoord').value);
            console.log(this.coordsForm.get('rValue').value);

            this.coordsForm.markAllAsTouched();
        }
    }

    reset() {
        this.submittedTrigger = false;
        this.coordsForm.controls['xCoord'].setValue("");
        this.coordsForm.controls['yCoord'].setValue("");
        this.coordsForm.controls['rValue'].setValue("");
    }

    xMin: number = -3;
    xMax: number = 5;
    yMin: number = -5;
    yMax: number = 5;
    rMin: number = -3;
    rMax: number = 5;

    xCoordValidator(control: FormControl): { [s: string]: boolean } | null {
        let validationMap: validationObj = {};

        if (control.value === "" || Number.isNaN(parseInt(control.value))) {
            validationMap['empty'] = true;
        } else if ((isNaN(control.value))) {
            validationMap['NaN'] = true;
        } else if ((control.value < this.xMin) || (control.value > this.xMax)) {
            validationMap['rangeErr'] = true;
        }

        return validationMap;
    }

    yCoordValidator(control: FormControl): { [s: string]: boolean } | null {
        let validationMap: validationObj = {};

        if (control.value === "" || Number.isNaN(parseInt(control.value))) {
            validationMap['empty'] = true;
        } else if ((isNaN(control.value))) {
            validationMap['NaN'] = true;
        } else if ((control.value < this.yMin) || (control.value > this.yMax)) {
            validationMap['rangeErr'] = true;
        }

        return validationMap;
    }

    rValueValidator(control: FormControl): { [s: string]: boolean } | null {
        let validationMap: validationObj = {};

        if (control.value === "" || Number.isNaN(parseInt(control.value))) {
            validationMap['empty'] = true;
            this.coordinatePlaneComponent.setDefaultR();
        } else if (control.value < 0 || control.value == 0) {
            validationMap['negative'] = true;
            this.coordinatePlaneComponent.setDefaultR();
        } else if (isNaN(control.value)) {
            validationMap['NaN'] = true;
            this.coordinatePlaneComponent.setDefaultR();
        } else if ((control.value < this.rMin) || (control.value > this.rMax)) {
            validationMap['rangeErr'] = true;
            this.coordinatePlaneComponent.setDefaultR();
        } else {
            this.coordinatePlaneComponent.setR(parseFloat(this.coordsForm.get('rValue').value));
        }

        return validationMap;
    }

    isFormRValid(): boolean {
        return !(this.coordsForm.controls['rValue'].hasError('rangeErr') ||
            this.coordsForm.controls['rValue'].hasError('NaN') ||
            this.coordsForm.controls['rValue'].hasError('empty'));
    }

    isXRangeValid(): boolean {
        return !(this.coordsForm.controls['xCoord'].hasError('rangeErr'));
    }

    isYRangeValid(): boolean {
        return !(this.coordsForm.controls['yCoord'].hasError('rangeErr'));
    }
}