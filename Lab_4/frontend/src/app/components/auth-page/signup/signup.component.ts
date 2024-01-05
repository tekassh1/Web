import {Component, OnInit} from "@angular/core";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgStyle} from "@angular/common";

@Component({
    selector: "signup-form",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgStyle
    ],
    styleUrls: ['./signup.component.css'],
    template: `
        <form [formGroup]="signupForm" novalidate (ngSubmit)="submit()">
            <div id="label">Sign <a class="colorfulText">up</a><br/></div>

            <input name="login" placeholder="username" maxlength="15"
                   [ngStyle]="{'background-color': [usernameInputBackground]}"/>
            <input type="password" name="password" placeholder="password" maxlength="15"
                   [ngStyle]="{'background-color': [passwordInputBackground]}"/>
            <input type="password" name="password" placeholder="repeat password" maxlength="15"
                   [ngStyle]="{'background-color': [passwordInputBackground]}"/>

            <button type="submit" id="submitBtn">Register</button>

            <div id="loginOfferBlock">
                Have an account?
                <button>Log In</button>
            </div>
        </form>
    `
})

export class SignupFormComponent implements OnInit {
    signupForm: FormGroup;

    defaultInputBackground: string = "#f3f3f3";
    errorInputBackground: string = "#ff9393";
    usernameInputBackground: string = this.defaultInputBackground;
    passwordInputBackground: string = this.defaultInputBackground;

    ngOnInit(): void {
        this.signupForm = new FormGroup({});
    }

    submit() {

    }
}