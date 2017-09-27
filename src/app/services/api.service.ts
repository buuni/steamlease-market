import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Product} from "../models/market/Product";

const PRODUCTS = '/apps/';
const PRODUCT = '/app/';
const AUTHORIZED_USER = '/user/';
const PAYMENT = '/payment/';

@Injectable()
export class ApiService {
    private _apiUrl: string = '/api';


    constructor(private _http: Http) {
    }

    getProducts<T = any>(options: any = null) : Promise<T> {
        return this._http.get(this.url(PRODUCTS), options)
            .toPromise()
            .then((res:Response) : T => res.json() as T)
            .catch(this.catchHandle);
    }

    getProductById<T = any>(id: number, options: any = null) : Promise<T> {
        return this.buildPromise<T>('get', PRODUCT, options, [id]);
    }

    getAuthorizedUser<T = any>(options: any = null) {
        return this.buildPromise<T>('get', AUTHORIZED_USER, options);
    }

    private buildPromise<T = any>(type: string, suffix: string, options?: any, urlSegments: Array<any> = []) : Promise<T> {
        let promise : any;

        switch (type) {
            case 'post':
                promise = this._http.post(this.url(suffix, urlSegments), options);
                break;
            case 'get':
            default:
                promise = this._http.get(this.url(suffix, urlSegments), options);
        }

        return promise.toPromise().then((res: Response) : T => res.json() as T)
            .catch(this.catchHandle);
    }

    private catchHandle(reason: any) {
        console.log(reason);
    }

    private url(suffix: string, urlSegments: Array<any> = []) : string {
        return this._apiUrl + suffix + urlSegments.join('/');
    }
}