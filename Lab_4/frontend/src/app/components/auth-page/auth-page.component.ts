import {Component} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginFormComponent} from "./login/login.component";
import {SignupFormComponent} from "./signup/signup.component";


@Component({
    selector: "auth-page",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        LoginFormComponent,
        SignupFormComponent

    ],
    styleUrls: ['./auth-page.component.css'],
    template: `
        <div id="mainPanel">
<!--           <login-form class="viewComponent"></login-form>-->
            <signup-form class="viewComponent"></signup-form>
        </div>
    `
})

export class AuthPageComponent {

}