import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {Product} from "../../../../models/market/Product";
import {FilterService} from "../../../../services/filter.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, ParamMap} from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
    selector: 'market-place',
    templateUrl: 'place.component.html',
})
export class PlaceComponent implements OnInit, OnDestroy {
    @HostBinding('class') classes = 'market-place';
    products: Product[] = [];
    isLoading: boolean = true;

    private _subscriptionLoaded: Subscription;
    private _subscriptionPerform: Subscription;
    private _subscriptionRouter: Subscription;

    constructor(private _filterService: FilterService, private _route: ActivatedRoute) {
        this._subscriptionPerform = this._filterService.notifyPerform(() => {
            this.isLoading = true;
        });

        this._subscriptionLoaded = this._filterService.notifyLoadedProducts(promise => {
            promise.then(products => {
                this.isLoading = false;
                return this.products = products;
            });
        });



        this._subscriptionRouter = this._route.paramMap
            .switchMap((params: ParamMap) => Promise.resolve(params.get('genre')))
            .subscribe(genre => {
                this._filterService.genre = genre;
                this._filterService.perform();
            });
    }

    ngOnInit(): void {}

    ngOnDestroy() : void {
        this._subscriptionLoaded.unsubscribe();
        this._subscriptionPerform.unsubscribe();
        this._subscriptionRouter.unsubscribe();
    }
}