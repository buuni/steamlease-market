import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {FilterService} from "../../services/filter.service";
import {ApiService} from "../../services/api.service";
import {ProfileComponent} from "./components/profile/profile.component";
import {UserInfoComponent} from "./components/profile/components/user-info/user-info.component";
import {InvoicesComponent} from "./components/profile/components/invoices/invoices.component";

@NgModule({
    imports: [SharedModule, RouterModule, FormsModule],
    exports: [ProfileComponent],
    declarations: [
        ProfileComponent,
        UserInfoComponent,
        InvoicesComponent
    ],
    providers: [FilterService]
})
export class ProfileModule {

}