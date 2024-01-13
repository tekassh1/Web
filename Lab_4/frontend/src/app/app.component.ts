import {Component, inject, OnInit} from "@angular/core";
import {RouterModule} from "@angular/router";

import {HeaderComponent} from "./components/common/header/header.component";
import {FooterComponent} from "./components/common/footer/footer.component";
import {AuthResponse} from "./model/auth-data";
import {AuthService} from "./services/auth.service";

@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        HeaderComponent,
        FooterComponent,
        RouterModule
    ],
    providers: [
        AuthService
    ],
    styleUrls: ['./app.component.css']
})

export class AppComponent {
}