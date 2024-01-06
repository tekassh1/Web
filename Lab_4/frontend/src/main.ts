import { bootstrapApplication } from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {appRoutes} from "./app/app.routes";
import {provideRouter} from "@angular/router";

bootstrapApplication(AppComponent).catch(e => console.error(e));
bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes)
    ]
}).catch((err) => console.error(err));