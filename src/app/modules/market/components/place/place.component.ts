import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {Product} from "../../../../models/market/Product";
import {FilterService} from "../../../../services/filter.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'market-place',
    templateUrl: 'place.component.html',
})
export class PlaceComponent implements OnInit, OnDestroy {
    @HostBinding('class') classes = 'market-place';
    products: Product[] = [];
    isLoading: boolean = true;

    private _subscription: Subscription;

    constructor(private _filterService: FilterService) {
        this._filterService.notifyPerform(() => {
            this.isLoading = true;
        });

        this._subscription = this._filterService.notifyLoadedProducts(promise => {
            promise.then(products => {
                this.isLoading = false;
                return this.products = products;
            });
        });
    }

    ngOnInit(): void {
        this._filterService.perform();
    }

    ngOnDestroy() : void {
        this._subscription.unsubscribe();
    }
}