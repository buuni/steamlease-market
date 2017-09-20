
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {FilterService} from "./filter.service";
import {Product} from "../models/market/Product";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import "rxjs/add/operator/map";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class ProductService {
    private _apiUrl: string = '/api';

    private _loadedProducts: Product[];

    constructor(private http: Http) {
        this._loadedProducts = [];
    }

    loadProductsByFilters(filterService: FilterService) : Promise<Product[]> {
        return this.http.get(this._apiUrl + '/apps', {search: filterService.getSearchParams()})
            .toPromise()
            .then((res: Response) => this._parseProductsData(res.json() as Array<any>));
    }

    private _parseProductsData(data: Array<any>) : Product[] {
        // Создаем экземпляры только несуществующих продуктов
        return data.map(value => {
            let product: Product;
            if(!(product = this._loadedProducts.find(pr => pr.id === value.id))) {
                product = Product.fromJson(value);
                this._loadedProducts.push(product);
            }

            return product;
        });
    }
}