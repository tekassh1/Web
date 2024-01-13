import {Component, inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {AuthResponse} from "../../../model/auth-data";

@Component({
    selector: "signup-form",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgStyle,
        NgIf,
        RouterModule
    ],
    styleUrls: ['./signup.component.css'],
    template: `
        <div id="mainPanel">
            <form [formGroup]="signupForm" novalidate (ngSubmit)="submit()">
                <div id="label">Sign <a class="colorfulText">up</a><br/></div>
    
                <input placeholder="username" formControlName="username" maxlength="15"
                    (click)="submitTrigger = false;"/>
                <input type="password" placeholder="password" formControlName="password" maxlength="15" 
                    (click)="submitTrigger = false;"/>
                <input type="password" placeholder="repeat password" formControlName="repeatPassword" maxlength="15" 
                    (click)="submitTrigger = false;"/>
    
                <button type="submit" id="submitBtn">Register</button>
    
                <div *ngIf="submitTrigger && signupForm.controls['username'].invalid"
                     class="wrongInputMsg">
                    Username should contain only letters and numbers (5-15 symbols)
                </div>
                <div *ngIf="submitTrigger && signupForm.controls['password'].invalid
                            && signupForm.controls['username'].valid"
                     class="wrongInputMsg">
                    Password should contain at least one letter and digit (5-15 symbols, no spaces)
                </div>
                <div *ngIf="submitTrigger && signupForm.controls['username'].valid && signupForm.controls['password'].valid
                            && signupForm.invalid"
                     class="wrongInputMsg">
                    Passwords are different!
                </div>
                <div *ngIf="serverMsg && submitTrigger"
                     class="wrongInputMsg">
                    {{serverMsg}}
                </div>
                
                <div id="loginOfferBlock">
                    Have an account?
                    <button type="button" [routerLink]="logInPageLink">Log In</button>
                </div>
            </form>
        </div>
    `
})

export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    submitTrigger: boolean = false;
    logInPageLink: string = "/login";
    serverMsg: string = null;

    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    ngOnInit() {
        let isLoggedIn: boolean = JSON.parse(sessionStorage.getItem("isLoggedIn"));
        if (isLoggedIn) this.router.navigate(['main']);

        this.signupForm = new FormGroup({
            "username": new FormControl("",
                [Validators.required, this.usernameValidator.bind(this)]),
            "password": new FormControl("",
                [Validators.required, this.passwordValidator.bind(this)]),
            "repeatPassword": new FormControl("",
                [Validators.required])
        },
            {validators: this.passwordMatchValidator});
    }

    submit() {
        this.submitTrigger = true;
        if (this.signupForm.invalid) return;
        let username: string = this.signupForm.get('username').value;
        let password: string = this.signupForm.get('password').value;

        this.authService.performSignup(username, password)
            .subscribe({
                next: (resp: AuthResponse) => {
                    localStorage.setItem("accessToken", resp.accessToken);
                    localStorage.setItem("refreshToken", resp.refreshToken);

                    sessionStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("username", username);

                    this.router.navigate(['main']);
                },
                error: (err) => {
                    let domparser: DOMParser = new DOMParser();
                    this.serverMsg = domparser.parseFromString(err.error, 'text/html').body.innerText;

                    sessionStorage.setItem("isLoggedIn", "false");
                    localStorage.removeItem("username");
                }
            });
    }

    usernameValidator(control: FormControl): { [s: string]: boolean } | null {
        let usernameRegex: RegExp = new RegExp('^[0-9A-Za-z_]{5,15}$');
        if (!usernameRegex.test(control.value)) {
            return {"username": true};
        }
        return null;
    }

    passwordValidator(control: FormControl): { [s: string]: boolean } | null {
        let passwordRegex: RegExp = new RegExp('^(?!.* )(?=.*?\\d)(?=.*?[a-zA-Z])[a-zA-Z\\d]+.{5,15}$');
        if (!passwordRegex.test(control.value)) {
            return {"password": true};
        }
        return null;
    }

    passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
        const password = form.controls['password'].value;
        const password_confirm = form.controls['repeatPassword'].value;

        if (!password || !password_confirm) {
            return null;
        }
        return (password === password_confirm) ? null : {"repeatPassword": true};
    }
}