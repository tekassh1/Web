import { bootstrapApplication } from "@angular/platform-browser";
import { MainHeader } from "./app/components/header/header.component";
import { MainFooter } from "./app/components/footer/footer.component";

bootstrapApplication(MainHeader).catch(e => console.error(e));
bootstrapApplication(MainFooter).catch(e => console.error(e));