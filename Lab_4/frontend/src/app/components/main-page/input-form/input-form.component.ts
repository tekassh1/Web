import {Component, ElementRef, inject, Input, OnInit, ViewChild} from "@angular/core";
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CoordinatePlaneComponent} from "../coordinate-plane/coordinate-plane.component";
import {DataService} from "../../../services/data.service";
import {CheckPointService} from "../../../services/check-point.service";
import {PointRequest, PointResponse} from "../../../model/point-data";

interface validationObj {
    [s: string]: boolean;
}

@Component({
    selector: "main-form",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf],
    styleUrls: ["input-form.css"],
    providers: [CheckPointService],
    templateUrl: './input-form.component.html'
})

export class CoordinatesFormComponent implements OnInit {
    coordsForm: FormGroup;

    @ViewChild("submitBtn", {static: false})
    submitBtn: ElementRef;

    @Input()
    coordinatePlaneComponent: CoordinatePlaneComponent;

    protected dataService: DataService = inject(DataService);
    protected checkPointService: CheckPointService = inject(CheckPointService);

    ngOnInit(): void {
        this.coordsForm = new FormGroup({
            "xCoord": new FormControl("", [Validators.required, this.xCoordValidator.bind(this)]),
            "yCoord": new FormControl("", [Validators.required, this.yCoordValidator.bind(this)]),
            "rValue": new FormControl("", [Validators.required, this.rValueValidator.bind(this)])
        });
    }

    submittedTrigger: boolean = false;

    submit() {
        this.submittedTrigger = true;

        if (!this.coordsForm.invalid) {

            let xCoord: string = this.coordsForm.get('xCoord').value;
            let yCoord: string = this.coordsForm.get('yCoord').value;
            let rValue: string = this.coordsForm.get('rValue').value;

            let pointReq: PointRequest = {x: xCoord, y: yCoord, r: rValue};
            this.checkPointService.checkPoint(pointReq).subscribe(
                {
                    next: (resp: PointResponse) => {
                        this.dataService.addPoint(resp);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                }
            );
        } else {
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
        let defaultR: number = 5;

        if (control.value === "" || Number.isNaN(parseInt(control.value))) {
            validationMap['empty'] = true;
            this.coordinatePlaneComponent.setDefaultR();
            this.coordinatePlaneComponent.setPlaneScaleCoefficient(defaultR);
            this.coordinatePlaneComponent.isSmallFont = false;
        } else if (control.value < 0 || control.value == 0) {
            validationMap['negative'] = true;
            this.coordinatePlaneComponent.setDefaultR();
            this.coordinatePlaneComponent.setPlaneScaleCoefficient(defaultR);
            this.coordinatePlaneComponent.isSmallFont = false;
        } else if (isNaN(control.value)) {
            validationMap['NaN'] = true;
            this.coordinatePlaneComponent.setDefaultR();
            this.coordinatePlaneComponent.setPlaneScaleCoefficient(defaultR);
            this.coordinatePlaneComponent.isSmallFont = false;
        } else if ((control.value < this.rMin) || (control.value > this.rMax)) {
            validationMap['rangeErr'] = true;
            this.coordinatePlaneComponent.setDefaultR();
            this.coordinatePlaneComponent.setPlaneScaleCoefficient(defaultR);
            this.coordinatePlaneComponent.isSmallFont = false;
        } else {
            let rVal = this.coordsForm.get('rValue').value;
            this.coordinatePlaneComponent.setR(parseFloat(rVal));
            this.coordinatePlaneComponent.setPlaneScaleCoefficient(rVal);
            this.coordinatePlaneComponent.isSmallFont = rVal <= 1.5;
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