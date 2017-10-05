import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {FilterService} from "../../services/filter.service";
import {ProfileComponent} from "./components/profile/profile.component";
import {UserInfoComponent} from "./components/profile/components/user-info/user-info.component";
import {InvoicesComponent} from "./components/profile/components/invoices/invoices.component";
import {InvoiceItemComponent} from "./components/profile/components/invoices/components/invoice/invoice.component";
import {MenuComponent} from "./components/menu/menu.component";
import {GamesComponent} from "./components/profile/components/games/games.component";
import {GamesItemComponent} from "./components/profile/components/games/components/game/game.component";

@NgModule({
    imports: [SharedModule, RouterModule, FormsModule],
    exports: [ProfileComponent],
    declarations: [
        ProfileComponent,
        UserInfoComponent,
        InvoicesComponent,
        InvoiceItemComponent,
        MenuComponent,
        GamesComponent,
        GamesItemComponent
    ],
    providers: [FilterService]
})
export class ProfileModule {

}