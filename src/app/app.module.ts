///<reference path="modules/market/market.module.ts"/>


import {ApiService} from "./services/api.service";

require("style-loader!../assets/base.scss");

import {BrowserModule, HammerGestureConfig} from "@angular/platform-browser";
import {NgRoutingModule} from "./ng-routing.module";
import {AppComponent} from "./app.component";
import {createInputTransfer, createNewHosts, removeNgStyles} from "@angularclass/hmr";
import {ApplicationRef, NgModule} from "@angular/core";
import {MarketModule} from "./modules/market/market.module";
import {CartService} from "./services/cart.service";
import {HttpModule} from "@angular/http";
import {CartModule} from "./modules/cart/cart.module";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {BuildArrayPipe} from "./pipes/buildArray.pipe";
import {CookieService} from "ngx-cookie-service";
import {ProductService} from "./services/product.service";
import {UserService} from "./services/user.service";


export class MyHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'swipe': {velocity: 0.4, threshold: 20} // override default settings
    };
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MarketModule,
        CartModule,
        NgRoutingModule,
        HttpModule
    ],
    providers: [
        ProductService,
        CartService,
        CookieService,
        ApiService,
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
    constructor(public appRef: ApplicationRef) {}
    hmrOnInit(store) {
        if (!store || !store.state) {
            return;
        }

        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        store.disposeOldHosts = createNewHosts(cmpLocation);
        store.state = {data: 'yolo'};
        store.restoreInputValues  = createInputTransfer();
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
