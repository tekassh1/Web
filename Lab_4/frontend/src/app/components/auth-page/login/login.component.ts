import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";

@Component({
    selector: "login-form",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgStyle
    ],
    styleUrls: ['./login.component.css'],
    template: `
        <form [formGroup]="loginForm" novalidate (ngSubmit)="submit()">
            <div id="label">Log <a class="colorfulText">in</a><br/></div>
            
            <input placeholder="username" formControlName="username" maxlength="15"
                   (click)="submitTrigger = false;"/>
            <input type="password" name="password" placeholder="password" formControlName="password" maxlength="15"
                   (click)="submitTrigger = false;"/>
            
            <div *ngIf="loginForm.controls['username'].invalid && submitTrigger"
                 class="wrongInputMsg">
                Username should contain only letters and numbers (5-15 symbols)
            </div>
            <div *ngIf="loginForm.controls['password'].invalid && submitTrigger
                        && loginForm.controls['username'].valid"
                 class="wrongInputMsg">
                Password should contain at least one letter and digit (5-15 symbols, no spaces)
            </div>
            
            <button type="submit" id="submitBtn">Continue</button>

            <div id="registerOfferBlock">
                Have not account yet?
                <button type="button">Sign Up</button>
            </div>
        </form>
    `
})

export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;

    submitTrigger: boolean = false;

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            "username": new FormControl("",
                [Validators.required, this.usernameValidator.bind(this)]),
            "password": new FormControl("",
                [Validators.required, this.passwordValidator.bind(this)])
        });
    }

    submit() {
        this.submitTrigger = true;
        if (this.loginForm.invalid) return;

        console.log("Login success!!!");
    }

    usernameValidator(control: FormControl): { [s: string]: boolean } | null {
        let usernameRegex: RegExp = new RegExp('^[0-9A-Za-z_]{5,15}$');
        if (!usernameRegex.test(control.value)) {
            return {"username": true};
        }
        return null;
    }

    passwordValidator(control: FormControl): { [s: string]: boolean } | null {
        let passwordRegex: RegExp = new RegExp("^(?!.* )(?=.*?\\d)(?=.*?[a-zA-Z])[a-zA-Z\\d]+.{5,15}$");
        if (!passwordRegex.test(control.value)) {
            return {"password": true};
        }
        return null;
    }
}