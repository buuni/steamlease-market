import {ActivatedRoute, Router, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {ProductService} from "./product.service";
import {Product} from "../models/market/Product";
import {Injectable} from "@angular/core";

@Injectable()
export class FilterService {

    productName: string = null;
    page: number = null;

    private _visibleProducts: Promise<Product[]>;
    private _productsSubject: Subject<Promise<Product[]>>;
    private _performSubject: Subject<any>;

    constructor(private _route: ActivatedRoute, private _router: Router, private _productService: ProductService) {
        this._route
            .queryParams
            .subscribe(params => {
                this.productName = params['search'] || null;
                this.page = params['page'] || null;
            });

        this._productsSubject = new Subject<Promise<Product[]>>();
        this._performSubject = new Subject<any>();

        this._visibleProducts = Promise.resolve([]);
    }

    getSearchParams() : any {
        return this._generateQueryParams().queryParams;
    }

    perform() {
        this._performSubject.next();

        let promise = this._router.navigate(
            ['/market/all'],
            this._generateQueryParams()
            );

        this._productsSubject.next(this._productService.loadProductsByFilters(this));
    }

    notifyLoadedProducts(callback: (promise: Promise<Product[]>) => any) : Subscription{
        return this._productsSubject.subscribe(callback);
    }

    notifyPerform(callback: () => any) {
        return this._performSubject.subscribe(callback);
    }

    private _generateQueryParams(): Params {
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