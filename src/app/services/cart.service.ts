import {Injectable} from "@angular/core";
import {Product} from "../models/market/Product";
import {CookieService} from "ngx-cookie-service";
import {ProductService} from "./product.service";
import {Data} from "@angular/router";
import {ProductInterface} from "../models/market/ProductInterface";

@Injectable()
export class CartService {
    private _products: Product[] = [];
    private _isLoadingCartProducts: boolean = true;

    get isLoadingCartProducts(): boolean {
        return this._isLoadingCartProducts;
    }

    get products(): Product[] {
        return this._products;
    }

    constructor(private _cookieService: CookieService, private _productService: ProductService) {

        let promise = new Promise((resolve, reject) => {
            let cookieProducts = this._cookiesProducts();
            let length = cookieProducts.length;

            if(length === 0) {
                resolve();
            }

            cookieProducts.forEach(id => {
                _productService.loadProductById(id).then(product => {
                    length--;
                    this.addProduct(product);
                    if(length === 0) {
                        resolve();
                    }
                });
            });
        }).then(() => this._isLoadingCartProducts = false);
    }

    addProduct(product: Product): void {
        this._addCookiesProduct(product.id);
        this._products.push(product);
    }

    removeProduct(product: Product): void {
        const index = this._products.indexOf(product);
        this.removeProductByIndex(index);
    }

    removeProductByIndex(index: number): void {
        if (this._products[index]) {
            this._removeCookiesProduct(this._products[index].id);
            this._products.splice(index, 1);
        }
    }

    totalSum(): Number {
        return this._products.reduce<Number>((previousValue, next) => (previousValue as number) + (next.price.value / 100), 0);
    }

    inTheCart(product: Product) {
        return this._products.indexOf(product) !== -1;
    }

    private _addCookiesProduct(id: number) {
        let cookiesProducts = this._cookiesProducts();
        if (!cookiesProducts.find(_id => id === _id)) {
            cookiesProducts.push(id);
            this._saveCookiesProducts(cookiesProducts);
        }
    }

    private _removeCookiesProduct(id: number) {
        let cookiesProducts = this._cookiesProducts();
        let index: number;
        if ((index = cookiesProducts.indexOf(id)) !== -1) {
            cookiesProducts.splice(index, 1);
            this._saveCookiesProducts(cookiesProducts);
        }
    }

    private _cookiesProducts(): Array<number> {
        return this._cookieService.check('cart') ? JSON.parse(this._cookieService.get('cart')) : [];
    }

    private _saveCookiesProducts(products: Array<number>) {
        this._cookieService.set(
            'cart',
            JSON.stringify(products),
            new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
            '/'
        );
    }
}