import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {appRoutes} from "./app/app.routes";
import {provideRouter} from "@angular/router";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {outcomeInterceptor} from "./app/services/interceptors/outcome-interceptor";
import {APP_INITIALIZER} from "@angular/core";
import {initializerFactory, InitializerService} from "./app/services/initializer.service";

bootstrapApplication(AppComponent).catch(e => console.error(e));

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([outcomeInterceptor])),
        {
            provide: APP_INITIALIZER,
            useFactory: initializerFactory,
            multi: true,
            deps: [InitializerService]
        },
    ]
}).catch((err) => console.error(err));