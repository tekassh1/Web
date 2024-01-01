import {Component, ElementRef} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: "main-footer",
    standalone: true,
    template: `
        <footer style="position: relative">
            &#169; Goovnocode inc. 2023
            <br/>
            <a href="{{gitHubRef}}" target="_blank">
                <img ngSrc="../../../assets/footer/github.svg" class="github" alt="githubLogo" width="25" height="25">
            </a>
        </footer>
    `,
    imports: [
        NgOptimizedImage,
    ],
    styleUrls: ['./footer.component.css']
})

export class MainFooter {
    gitHubRef: string;

    constructor(elem: ElementRef) {
        this.gitHubRef = elem.nativeElement.getAttribute("gitHubRef");
    }
}