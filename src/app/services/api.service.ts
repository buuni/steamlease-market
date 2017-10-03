import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions, RequestMethod, Request} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Product} from "../models/market/Product";

const PRODUCTS = '/api/apps/';
const PRODUCT = '/api/app/';
const AUTHORIZED_USER = '/user/profile/info/';
const SIGN_PAYMENT = '/payment/sign/';
const USER_INVOICES = '/user/profile/invoices/';

@Injectable()
export class ApiService {
    private _apiUrl: string = '';

    private _options?: any;

    constructor(private _http: Http) {
        let headers = new Headers();
        headers.set('Content-type', 'application/json');

        this._options = {
            headers: headers
        };
    }

    getProducts<T = any>(options: any = null) : Promise<T> {
        return this.buildPromise<T>(RequestMethod.Get, PRODUCTS, { params: options });
    }

    getProductById<T = any>(id: number, options: any = null) : Promise<T> {
        return this.buildPromise<T>(RequestMethod.Get, PRODUCT, options, [id]);
    }

    getAuthorizedUser<T = any>(options: any = null) : Promise<T> {
        return this.buildPromise<T>(RequestMethod.Get, AUTHORIZED_USER, options);
    }

    getUserInvoices<T = any>() : Promise<T> {
        return this.buildPromise<T>(RequestMethod.Get, USER_INVOICES);
    }

    signPayment<T = any>(paymentData: any) {
        return this.buildPromise<T>(RequestMethod.Post, SIGN_PAYMENT, { body: JSON.stringify(paymentData) });
    }

    private buildPromise<T = any>(type: RequestMethod, suffix: string, options?: any, urlSegments: Array<any> = []) : Promise<T> {
        options = Object.assign(options || {}, this._options);

        const request = new RequestOptions({
            method: type,
            url: this.url(suffix, urlSegments),
            headers: options.headers || {},
            params: options.params || {},
            body: options.body || {}
        });

        return this._http.request(new Request(request))
            .toPromise()
            .then((res: Response) : T => {
                return res.json() as T;
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log(error.status);

        return Promise.reject(error);
    }

    private url(suffix: string, urlSegments: Array<any> = []) : string {
        return this._apiUrl + suffix + urlSegments.join('/');
    }
}