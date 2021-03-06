import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {FilterService} from "../../services/filter.service";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {CartComponent} from "./components/header/components/cart/cart.component";
import {IndexComponent} from "./components/index/index.component";
import {ProductComponent} from "./components/index/components/product/product.component";
import {TruncatePipe} from "../../pipes/truncate.pipe";
import {BuildArrayPipe} from "../../pipes/buildArray.pipe";
import {AccountComponent} from "./components/header/components/account/account.component";
import {PaymentComponent} from "./components/index/components/payment/payment.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [SharedModule, RouterModule, FormsModule],
    exports: [HeaderComponent],
    declarations: [
        HeaderComponent,
        CartComponent,
        IndexComponent,
        ProductComponent,
        AccountComponent,
        PaymentComponent
    ],
    providers: [FilterService]
})
export class CartModule {

}