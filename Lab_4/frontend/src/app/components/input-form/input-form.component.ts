import {Component, OnInit} from "@angular/core";
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

interface vObj {
    [s: string]: boolean;
}

@Component({
    selector: "main-form",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf],
    styleUrls: ["input-form.css"],
    templateUrl: './input-form.component.html'
})

export class CoordinatesFormComponent implements OnInit{
    coordsForm: FormGroup;

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
            console.log("x: " + this.coordsForm.get('xCoord').value);
            console.log("y: " + this.coordsForm.get('yCoord').value);
            console.log("r: " + this.coordsForm.get('rValue').value);
        } else {
            this.coordsForm.markAllAsTouched();
        }
        console.log("Submit called!");
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

    // isRSelected(): boolean {
    //     return !(this.coordsForm.controls['rValue'].hasError('rangeErr') ||
    //         this.coordsForm.controls['rValue'].hasError('NaN'));
    // }

    xCoordValidator(control: FormControl): { [s: string]: boolean } | null {
        let validationMap: vObj = {};

        if (control.value === "") {
            validationMap['empty'] = true;
        } else if ((isNaN(control.value))) {
            validationMap['NaN'] = true;
        } else if ((control.value < this.xMin) || (control.value > this.xMax)) {
            validationMap['rangeErr'] = true;
        }

        return validationMap;
    }

    yCoordValidator(control: FormControl): { [s: string]: boolean } | null {
        let validationMap: vObj = {};

        if (control.value === "") {
            validationMap['empty'] = true;
        } else if ((isNaN(control.value))) {
            validationMap['NaN'] = true;
        } else if ((control.value < this.yMin) || (control.value > this.yMax)) {
            validationMap['rangeErr'] = true;
        }

        return validationMap;
    }

    rValueValidator(control: FormControl): { [s: string]: boolean } | null {
        let validationMap: vObj = {};

        if (control.value === "") {
            validationMap['empty'] = true;
        } else if (isNaN(control.value)) {
            validationMap['NaN'] = true;
        } else if ((control.value < this.rMin) || (control.value > this.rMax)) {
            validationMap['rangeErr'] = true;
        }

        return validationMap;
    }

    protected readonly console = console;
}