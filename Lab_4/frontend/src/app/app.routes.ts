import {MainPageComponent} from "./components/main-page/main-page.component";
import {LoginComponent} from "./components/auth-page/login/login.component";
import {SignupComponent} from "./components/auth-page/signup/signup.component";
import {NotFoundErrorPageComponent} from "./components/page-not-found/not-found-error-page.component";
import {ServerErrorPageComponent} from "./components/server-error-page/server-error-page.component";
import {AuthGuard} from "./security/auth-guard";

export const appRoutes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'login'},
    {path: 'notFoundError', component: NotFoundErrorPageComponent},
    {path: 'serverError', component: ServerErrorPageComponent},
    {path: '**', redirectTo: '/notFoundError'}
];