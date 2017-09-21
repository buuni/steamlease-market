import {ActivatedRoute, Router, Params, ParamMap} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {ProductService} from "./product.service";
import {Product} from "../models/market/Product";
import {Injectable} from "@angular/core";
import {PlatformLocation} from "@angular/common";

@Injectable()
export class FilterService {

    productName: string = null;
    page: number = 1;
    offset: number = 9;
    genre: string;

    private _visibleProducts: Promise<Product[]>;
    private _productsSubject: Subject<Promise<Product[]>>;
    private _performSubject: Subject<any>;
    private isGoBack: boolean = false;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _productService: ProductService,
                private _location: PlatformLocation)
    {
        this._location.onPopState(() => {
            this.isGoBack = true;
        });

        this._route
            .queryParams
            .subscribe(params => {
                this.productName = params['search'] || null;
                this.page = params['page'] || null;
                if(this.isGoBack) {
                    this.perform();
                }
            });

        this._productsSubject = new Subject<Promise<Product[]>>();
        this._performSubject = new Subject<any>();

        this._visibleProducts = Promise.resolve([]);
    }

    /**
     * Формирует объект с параметрами запроса к API
     * @returns {any}
     */
    getSearchParams() : any {
        const queryParams = this._getQueryParams().queryParams;

        if(this.offset !== null) {
            queryParams['offset'] = this.offset;
        }

        if(!queryParams['page']) {
            queryParams['page'] = 1;
        }

        queryParams['genre'] = this.genre;

        return queryParams;
    }

    perform() {
        this._performSubject.next();

        if(!this.isGoBack) {
            let promise = this._router.navigate(
                [this._router.url.split('?')[0]],
                this._getQueryParams()
            );
            this.isGoBack = false;
        }

        this._productsSubject.next(this._productService.loadProductsByFilters(this));
    }

    notifyLoadedProducts(callback: (promise: Promise<Product[]>) => any) : Subscription{
        return this._productsSubject.subscribe(callback);
    }

    notifyPerform(callback: () => any) {
        return this._performSubject.subscribe(callback);
    }

    /**
     * Формирует объект, данные которого будут находятся в роутере, для построения поисковой строки
     * @returns {Params}
     * @private
     */
    private _getQueryParams(): Params {
        const params: Array<any> = [];

        if(this.productName !== null && this.productName.trim() !== '') {
            params['search'] = this.productName.trim();
        }

        // Дополнительно проверяем на корректно введеное значение
        if(this.page !== null && parseInt(this.page.toLocaleString())) {
            params['page'] = this.page;
        }

        return { queryParams: params };
    }

}