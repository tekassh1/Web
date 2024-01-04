import {Component, Input, ViewChild} from "@angular/core";
import {NgOptimizedImage, NgStyle} from "@angular/common";

@Component({
    selector: "main-header",
    standalone: true,
    template: `
        <header class="header">
            <div class="collapsedHeader">
                <h2 class="label">LAB 4</h2>
                <img ngSrc="../../../assets/header/main.svg" class="logo" alt="mainLogo" fill="">

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
            </div>

        </header>
    `,
    imports: [
        NgOptimizedImage,
        NgStyle
    ],
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    username: string = "";

    @Input() studentName: string;
    @Input() groupNumber: string;
    @Input() variantNumber: string;

    @ViewChild('expanded', {static: false})
    expanded: HTMLElement
    @ViewChild('arrow', {static: false})
    arrow: HTMLElement
    @ViewChild('expandButton', {static: false})
    expandButton: HTMLElement

    arrowUpUrl: string = "../../../assets/header/arrow-up.svg";
    arrowDownUrl: string = "./../../assets/header/arrow-down.svg";
    arrowUrl: string = this.arrowDownUrl;

    expandedHeight: number = 0;
    expandedMaxHeight: number = 130;

    expand() {
        if (this.expandedHeight == this.expandedMaxHeight) {
            this.expandedHeight = 0;
            this.arrowUrl = this.arrowDownUrl;
        } else {
            this.expandedHeight = this.expandedMaxHeight;
            this.arrowUrl = this.arrowUpUrl;
        }
    }
}