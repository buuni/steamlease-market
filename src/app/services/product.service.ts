
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {FilterService} from "./filter.service";
import {Product} from "../models/market/Product";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {privateDecrypt} from "crypto";

@Injectable()
export class ProductService {
    private _apiUrl: string = '/api';

    private _loadedProducts: Product[];

    constructor(private _http: Http) {
        this._loadedProducts = [];
    }

    loadProductsByFilters(filterService: FilterService) : Promise<Product[]> {
        return this._http.get(this._apiUrl + '/apps', {search: filterService.getSearchParams()})
            .toPromise()
            .then((res: Response) => {
                return this._parseProducts(res.json() as Array<any>);
            });
    }

    private _parseProducts(data: Array<any>) : Product[] {
        return data.map(value => this._parseProduct(value));
    }

    hasProductById(id: number) : boolean | Product {
        return this._loadedProducts.find(product => product.id === id) || false;
    }

    loadProductById(id: number) : Promise<Product> {
        let product;

        if((product = this.hasProductById(id))) {
            return Promise.resolve(product);
        }

        return this._http.get(this._apiUrl + '/app/' + id)
            .toPromise()
            .then((res: Response) => this._parseProduct((res.json() as Array<any>)[0]));
    }

    private _parseProduct(data: any) : Product {
        let product;
        // Создаем экземпляры только несуществующих продуктов
        if(!(product = this.hasProductById(data.id))) {
            product = Product.fromJson(data);
            this._loadedProducts.push(product);
        }

        return product;
    }
}