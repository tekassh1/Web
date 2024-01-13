import {Component, inject, Input, OnInit, ViewChild} from "@angular/core";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {expand} from "rxjs";
import {AuthResponse} from "../../../model/auth-data";

@Component({
    selector: "main-header",
    standalone: true,
    template: `
        <header class="header">
            <div class="collapsedHeader">
                <h2 class="label">LAB 4</h2>
                <p *ngIf="router.url === '/main'" id="usernameText">{{username}}</p>
                <img ngSrc="../../../../assets/header/main.svg" class="logo" alt="mainLogo" fill="">

                <button #expandButton (click)="expand()" type="button" id="expandButton">
                    <img #arrow ngSrc="{{arrowUrl}}"
                         alt="expandAuthorIcon" fill="" id="arrow">
                </button>
            </div>

            <div #expanded class="infoText"
                 [ngStyle]="{'max-height': [expandedHeight] + 'px', 'max-width': 'inherit'}">

                <p style="margin-top: 13px;">Student: <a class="colourfulText">{{ studentName }}</a></p>
                <p>Group: <a class="colourfulText">{{ groupNumber }}</a></p>
                <p style="margin-bottom: 13px;">Variant: <a class="colourfulText">{{ variantNumber }}</a></p>
                
                <button *ngIf="router.url === '/main'" #logoutButton (click)="logout()" id="logoutButton" title="Log out">
                    <img #logoutImg ngSrc="{{logoutUrl}}"
                         alt="logoutIcon" fill="" id="logoutImg">
                </button>
            </div>

        </header>
    `,
    imports: [
        NgOptimizedImage,
        NgStyle,
        NgIf
    ],
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
    username: string = localStorage.getItem("username");

    @Input() studentName: string;
    @Input() groupNumber: string;
    @Input() variantNumber: string;

    @ViewChild('expanded', {static: false})
    expanded: HTMLElement
    @ViewChild('arrow', {static: false})
    arrow: HTMLElement
    @ViewChild('expandButton', {static: false})
    expandButton: HTMLElement

    logoutUrl: string = "../../../assets/header/logout.svg";
    arrowUpUrl: string = "../../../assets/header/arrow-up.svg";
    arrowDownUrl: string = "./../../assets/header/arrow-down.svg";
    arrowUrl: string = this.arrowDownUrl;

    expandedHeight: number = 0;
    expandedMaxHeight: number = 130;

    authService: AuthService = inject(AuthService);
    router: Router = inject(Router);

    showLogOut: boolean = true;

    expand() {
        if (this.expandedHeight == this.expandedMaxHeight) {
            this.expandedHeight = 0;
            this.arrowUrl = this.arrowDownUrl;
        } else {
            this.expandedHeight = this.expandedMaxHeight;
            this.arrowUrl = this.arrowUpUrl;
        }
    }

    logout() {
        console.log("Logout method called!");
        this.authService.logout(localStorage.getItem("username"))
            .subscribe({
                next: (resp: AuthResponse) => {
                    this.router.navigate(["login"]);
                },
                error: (err) => {
                    this.router.navigate(["serverError"]);
                }
            })
        this.expand();
    }

    ngOnInit(): void {
        this.showLogOut = (sessionStorage.getItem("isLoggedIn")) == "true";
    }
}