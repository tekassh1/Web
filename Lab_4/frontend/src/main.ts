import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {appRoutes} from "./app/app.routes";
import {provideRouter} from "@angular/router";
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {outcomeInterceptor} from "./app/services/interceptors/outcome-interceptor";
import {APP_INITIALIZER} from "@angular/core";
import {firstValueFrom, tap} from "rxjs";
import {AuthService} from "./app/services/auth.service";

bootstrapApplication(AppComponent).catch(e => console.error(e));

export async function initializeApp(http: HttpClient, authService: AuthService) {
    let shouldRoute: boolean = await authService.pingAuth();
    if (shouldRoute) sessionStorage.setItem("isLoggedIn", "true");
    else sessionStorage.setItem("isLoggedIn", "false");
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideHttpClient(withInterceptors([outcomeInterceptor])),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            multi: true,
            deps: [HttpClient, AuthService],
        },
    ]
}).catch((err) => console.error(err));