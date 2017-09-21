import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {MarketComponent} from "./components/market/market.component";
import {MenuComponent} from "./components/menu/menu.component";
import {PlaceComponent} from "./components/place/place.component";
import {ProductComponent} from "./components/place/components/product/product.component";
import {FilterService} from "../../services/filter.service";
import {SearchComponent} from "./components/search/search.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TruncatePipe} from "../../pipes/truncate.pipe";
import {PaginationComponent} from "./components/place/components/pagination/pagination.component";
import {BuildArrayPipe} from "../../pipes/buildArray.pipe";

@NgModule({
    imports: [SharedModule, RouterModule, FormsModule],
    exports: [MarketComponent],
    declarations: [
        // Components
        MarketComponent,
        MenuComponent,
        PlaceComponent,
        ProductComponent,
        SearchComponent,
        PaginationComponent,
        // Pipes
        TruncatePipe,
        BuildArrayPipe
    ],
    providers: [FilterService]
})
export class MarketModule {

}