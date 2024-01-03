import {Component} from "@angular/core";
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
    template: `
        <form [formGroup]="coordsForm" novalidate (ngSubmit)="submit()">
            <div class="selectionBlock">
                Enter<a class="colorfulText"> X </a>value<br/>

                <input name="xCoord" formControlName="xCoord"/>

                <div *ngIf="coordsForm.controls['xCoord'].hasError('rangeErr') && coordsForm.controls['xCoord'].touched"
                     class="wrongInputMsg">
                    Wrong 'x' value! Available range ({{xMin}} ; {{xMax}})
                </div>
                <div *ngIf="coordsForm.controls['xCoord'].hasError('NaN') && coordsForm.controls['xCoord'].touched"
                     class="wrongInputMsg">
                    Wrong 'x' value! Value should be a numeric!
                </div>
            </div>
            <div class="selectionBlock">
                Enter<a class="colorfulText"> Y </a>value<br/>

                <input name="yCoord" formControlName="yCoord"/>

                <div *ngIf="coordsForm.controls['yCoord'].hasError('rangeErr') && coordsForm.controls['yCoord'].touched"
                     class="wrongInputMsg">
                    Wrong 'y' value! Available range ({{yMin}} ; {{yMax}})
                </div>
                <div *ngIf="coordsForm.controls['yCoord'].hasError('NaN') && coordsForm.controls['yCoord'].touched"
                     class="wrongInputMsg">
                    Wrong 'y' value! Value should be a numeric!
                </div>
            </div>
            <div class="selectionBlock">
                Enter<a class="colorfulText"> R </a>value<br/>

                <input name="rValue" formControlName="rValue"/>
                <div *ngIf="coordsForm.controls['rValue'].hasError('rangeErr') && coordsForm.controls['rValue'].touched"
                     class="wrongInputMsg">
                    Wrong 'r' value! Available range ({{rMin}} ; {{rMax}})
                </div>
                <div *ngIf="coordsForm.controls['rValue'].hasError('NaN') && coordsForm.controls['rValue'].touched"
                     class="wrongInputMsg">
                    Wrong 'r' value! Value should be a numeric!
                </div>
            </div>
            <div id="submitBlock">
                <button type="submit" id="checkRequestBtn">Check</button>
                <button type="reset" id="resetBtn">Reset values</button>
            </div>
        </form>
    `
})

export class MainForm {
    coordsForm: FormGroup;

    constructor() {
        this.coordsForm = new FormGroup({
            "xCoord": new FormControl("", [Validators.required, this.xCoordValidator.bind(this)]),
            "yCoord": new FormControl("", [Validators.required, this.yCoordValidator.bind(this)]),
            "rValue": new FormControl("", [Validators.required, this.rValueValidator.bind(this)])
        });
    }

    submit() {
        if (!this.coordsForm.invalid) {
            console.log("x: " + this.coordsForm.get('xCoord').value);
            console.log("y: " + this.coordsForm.get('yCoord').value);
            console.log("r: " + this.coordsForm.get('rValue').value);
        }
    }

    xMin: number = -3;
    xMax: number = 5;
    yMin: number = -5;
    yMax: number = 5;
    rMin: number = -3;
    rMax: number = 5;


    xCoordValidator(control: FormControl): {[s: string]: boolean} | null {
        let validationMap: vObj = {};

        if ((isNaN(control.value))) {
            validationMap['NaN'] = true;
        }
        else if ((control.value < this.xMin) || (control.value > this.xMax)) {
            validationMap['rangeErr'] = true;
        }
        return validationMap;
    }

    yCoordValidator(control: FormControl): {[s: string]: boolean} | null {
        let validationMap: vObj = {};

        if ((isNaN(control.value))) {
            validationMap['NaN'] = true;
        }
        else if ((control.value < this.yMin) || (control.value > this.yMax)) {
            validationMap['rangeErr'] = true;
        }
        return validationMap;
    }

    rValueValidator(control: FormControl): {[s: string]: boolean} | null {
        let validationMap: vObj = {};

        if ((isNaN(control.value))) {
            validationMap['NaN'] = true;
        }
        else if ((control.value < this.rMin) || (control.value > this.rMax)) {
            validationMap['rangeErr'] = true;
        }
        return validationMap;
    }
}