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
            
            <input name="login" placeholder="username" formControlName="username" maxlength="15"
                   [ngStyle]="{'background-color': [usernameInputBackground]}"
                   (click)="resetUsernameBackground()"/>
            <input type="password" name="password" placeholder="password" formControlName="password" maxlength="15"
                   [ngStyle]="{'background-color': [passwordInputBackground]}"
                   (click)="resetPasswordBackground()"/>
            
            <div *ngIf="loginForm.controls['username'].invalid && loginForm.controls['username'].touched"
                 class="wrongInputMsg">
                Username should contain only letters and numbers (5-15 symbols)
            </div>
            <div *ngIf="loginForm.controls['password'].invalid && loginForm.controls['password'].touched 
                        && loginForm.controls['username'].valid"
                 class="wrongInputMsg">
                Password should contain letters and at least one digit (5-15 symbols)
            </div>
            
            <button type="submit" id="submitBtn">Continue</button>

            <div id="registerOfferBlock">
                Have not account yet?
                <button>Sign Up</button>
            </div>
        </form>
    `
})

export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;

    defaultInputBackground: string = "#f3f3f3";
    errorInputBackground: string = "#ffdfdf";
    usernameInputBackground: string = this.defaultInputBackground;
    passwordInputBackground: string = this.defaultInputBackground;

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            "username": new FormControl("",
                [Validators.required, this.usernameValidator.bind(this)]),
            "password": new FormControl("",
                [Validators.required, this.passwordValidator.bind(this)])
        });
    }

    submit() {
        if (this.loginForm.invalid) return;

        console.log("Login success!!!");
    }

    resetUsernameBackground() {
        this.usernameInputBackground = this.defaultInputBackground;
    }

    resetPasswordBackground() {
        this.passwordInputBackground = this.defaultInputBackground;
    }

    usernameValidator(control: FormControl): { [s: string]: boolean } | null {
        let usernameRegex: RegExp = new RegExp('^[0-9A-Za-z_]{5,15}$');
        if (!usernameRegex.test(control.value)) {
            if (control.touched) this.usernameInputBackground = this.errorInputBackground;
            return {"username": true};
        }
        return null;
    }

    passwordValidator(control: FormControl): { [s: string]: boolean } | null {
        let passwordRegex: RegExp = new RegExp('^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{5,15}$');
        if (!passwordRegex.test(control.value)) {
            if (control.touched) this.passwordInputBackground = this.errorInputBackground;
            return {"password": true};
        }
        return null;
    }
}