import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {FilterService} from "../../services/filter.service";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {CartComponent} from "./components/cart/cart.component";

@NgModule({
    imports: [SharedModule, RouterModule],
    exports: [HeaderComponent],
    declarations: [HeaderComponent, CartComponent],
    providers: [FilterService]
})
export class CartModule {

}