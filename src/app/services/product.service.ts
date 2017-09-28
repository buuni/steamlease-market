
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
import {ApiService} from "./api.service";

@Injectable()
export class ProductService {
    private _apiUrl: string = '/api';

    private _loadedProducts: Product[];

    constructor(private _http: Http, private _apiService: ApiService) {
        this._loadedProducts = [];
    }

    loadProductsByFilters(filterService: FilterService) : Promise<Product[]> {

        return this._apiService.getProducts<Array<any>>(filterService.getSearchParams())
            .then(data => this._parseProducts(data));
    }

    hasProductById(id: number) : boolean | Product {
        return this._loadedProducts.find(product => product.id === id) || false;
    }

    loadProductById(id: number) : Promise<Product> {
        let product;

        if((product = this.hasProductById(id))) {
            return Promise.resolve(product);
        }

        return this._apiService.getProductById<Array<any>>(id)
            .then(data => this._parseProduct(data[0]));
    }

    private _parseProducts(data: Array<any>) : Product[] {
        return data.map(value => this._parseProduct(value));
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