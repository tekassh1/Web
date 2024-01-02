import {Component} from "@angular/core";
import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: "main-form",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    styleUrls: ["input-form.css"],
    template: `
        <form [formGroup]="coordsForm" novalidate (ngSubmit)="submit()">
            <div class="selectionBlock">
                Enter<a class="colorfulText"> X </a>value<br/>

                <input name="xCoord" formControlName="xCoord"/>
                @if (coordsForm.controls['xCoord'].invalid && coordsForm.controls['xCoord'].touched) {
                    <div>Wrong X value!</div>
                }
            </div>
            <div class="selectionBlock">
                Enter<a class="colorfulText"> Y </a>value<br/>

                <input name="yCoord" formControlName="yCoord"/>
                <!--                @if (coordsForm.controls["yCoord"].invalid && coordsForm.controls["yCoord"].touched) {-->
                <!--                    <div class="alert">Wrong Y value!</div>-->
                <!--                }-->
            </div>
            <div class="selectionBlock">
                Enter<a class="colorfulText"> R </a>value<br/>

                <input name="rValue" formControlName="rValue"/>
                <!--                @if (coordsForm.controls["rValue"].invalid && coordsForm.controls["rValue"].touched) {-->
                <!--                    <div class="alert">Wrong R value!</div>-->
                <!--                }-->
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
            "xCoord": new FormControl("", [Validators.required, this.xCoordValidator]),
            "yCoord": new FormControl("", Validators.required),
            "rValue": new FormControl("", Validators.required)
        });
    }

    submit() {
        console.log(this.coordsForm);
    }

    xCoordValidator(control: FormControl): { [s: string]: boolean } | null {
        if (control.value < -3 || control.value > 5) {
            return {"xCoord": true};
        }
        return null;
    }
}