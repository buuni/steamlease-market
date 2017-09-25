import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {FilterService} from "../../services/filter.service";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {CartComponent} from "./components/cart/cart.component";
import {IndexComponent} from "./components/index/index.component";
import {ProductComponent} from "./components/index/components/product/product.component";
import {TruncatePipe} from "../../pipes/truncate.pipe";
import {BuildArrayPipe} from "../../pipes/buildArray.pipe";
import {LoadingComponent} from "../shared/components/loading/loading.component";

@NgModule({
    imports: [SharedModule, RouterModule],
    exports: [HeaderComponent],
    declarations: [
        HeaderComponent,
        CartComponent,
        IndexComponent,
        ProductComponent
    ],
    providers: [FilterService]
})
export class CartModule {

}