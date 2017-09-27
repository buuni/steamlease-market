import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PageNotFoundComponent} from "./modules/shared/components/page-not-found/page-not-found.component";
import {MarketComponent} from "./modules/market/components/market/market.component";
import {PlaceComponent} from "./modules/market/components/place/place.component";
import {MenuComponent} from "./modules/market/components/menu/menu.component";
import {IndexComponent} from "./modules/cart/components/index/index.component";


const routes: Routes = [
    { path: 'cart', component: IndexComponent },
    {
        path: '',
        component: MarketComponent,
        children: [
            {
                path: '',
                component: PlaceComponent,
            },
            {
                path: ':genre',
                component: PlaceComponent,
            }
        ]
    },
    // {path: 'lazy', loadChildren: './modules/lazy/lazy.module#LazyModule'},
    // {path: 'lazy', component: LazyComponent},
    {path: '**', component: PageNotFoundComponent},
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class NgRoutingModule {
}
