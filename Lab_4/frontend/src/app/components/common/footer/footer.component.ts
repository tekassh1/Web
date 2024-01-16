import {Component, Input} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: "main-footer",
    standalone: true,
    template: `
        <footer style="position: relative">
            {{ developers }}
            <br/>
            <a href="{{gitHubRef}}" target="_blank">
                <!-- local -->
                <img ngSrc="../../../../assets/footer/github.svg" class="github" alt="githubLogo" width="25"
                     height="25">

                <!-- Helios -->
<!--                <img ngSrc="assets/footer/github.svg" class="github" alt="githubLogo" width="25"-->
<!--                     height="25">-->
            </a>
        </footer>
    `,
    imports: [
        NgOptimizedImage,
    ],
    styleUrls: ['./footer.component.css']
})

export class FooterComponent {
    @Input() gitHubRef: string;
    @Input() developers: string;
}