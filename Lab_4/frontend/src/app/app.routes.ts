import {MainPageComponent} from "./components/main-page/main-page.component";
import {LoginComponent} from "./components/auth-page/login/login.component";
import {SignupComponent} from "./components/auth-page/signup/signup.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";

export const appRoutes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'main', component: MainPageComponent},
    {path: '', redirectTo: 'login'},
    {path: 'error', component: ErrorPageComponent},
    {path: '**', redirectTo: '/error'}
];