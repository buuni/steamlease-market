import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PageNotFoundComponent} from "./modules/shared/components/page-not-found/page-not-found.component";
import {MarketComponent} from "./modules/market/components/market/market.component";
import {PlaceComponent} from "./modules/market/components/place/place.component";
import {IndexComponent} from "./modules/cart/components/index/index.component";
import {ProfileComponent} from "./modules/profile/components/profile/profile.component";
import {UserInfoComponent} from "./modules/profile/components/profile/components/user-info/user-info.component";
import {InvoicesComponent} from "./modules/profile/components/profile/components/invoices/invoices.component";
import {GamesComponent} from "./modules/profile/components/profile/components/games/games.component";


const routes: Routes = [
    {
        path: 'cart',
        component: IndexComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        children: [
            {
                path: '',
                component: UserInfoComponent
            },
            {
                path: 'invoices',
                component: InvoicesComponent
            },
            {
                path: 'games',
                component: GamesComponent
            }
        ]
    },
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
