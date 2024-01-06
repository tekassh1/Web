import {Component} from "@angular/core";
import {RouterModule} from "@angular/router";

import {HeaderComponent} from "./components/common/header/header.component";
import {FooterComponent} from "./components/common/footer/footer.component";

@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        HeaderComponent,
        FooterComponent,
        RouterModule
    ],
    styleUrls: ['./app.component.css']
})

export class AppComponent {

}