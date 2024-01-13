import {Component, inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {Router, RouterModule} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {AuthResponse} from "../../../model/auth-data";

@Component({
    selector: "login-form",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgStyle,
        RouterModule
    ],
    styleUrls: ['./login.component.css'],
    template: `
        <div id="mainPanel">
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
                <div *ngIf="serverMsg && submitTrigger"
                     class="wrongInputMsg">
                    {{serverMsg}}
                </div>
                
                <button type="submit" id="submitBtn">Continue</button>

                <div id="registerOfferBlock">
                    Have not account yet?
                    <button type="button" [routerLink]="signUpPageLink">Sign Up</button>
                </div>
            </form>
        </div>
    `
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitTrigger: boolean = false;
    signUpPageLink: string = "/signup";
    serverMsg: string = null;

    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    ngOnInit(): void {
        let isLoggedIn: boolean = JSON.parse(sessionStorage.getItem("isLoggedIn"));
        if (isLoggedIn) this.router.navigate(['main']);

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
        let username: string = this.loginForm.get('username').value;
        let password: string = this.loginForm.get('password').value;

        this.authService.performLogin(username, password)
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
        let passwordRegex: RegExp = new RegExp("^(?!.* )(?=.*?\\d)(?=.*?[a-zA-Z])[a-zA-Z\\d]+.{5,15}$");
        if (!passwordRegex.test(control.value)) {
            return {"password": true};
        }
        return null;
    }
}