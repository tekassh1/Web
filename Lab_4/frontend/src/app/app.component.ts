import {Component} from "@angular/core";
import {MainHeader} from "./components/header/header.component";
import {MainFooter} from "./components/footer/footer.component";
import {MainForm} from "./components/input-form/input-form.component";

@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        MainHeader,
        MainFooter,
        MainForm
    ],
    styleUrls: ['./app.component.css']
})

export class AppComponent {

}