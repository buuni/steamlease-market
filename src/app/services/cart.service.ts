import {Injectable} from "@angular/core";
import {Product} from "../models/market/Product";

@Injectable()
export class CartService {
    private _products: Product[] = [];

    get products() : Product[] {
        return this._products;
    }

    constructor() {
    }

    addProduct(product : Product) : void {
        this._products.push(product);
    }

    removeProduct(product: Product) : void {
        const index = this._products.indexOf(product);
        this.removeProductByIndex(index);
    }

    removeProductByIndex(index: number) : void {
        if(this._products[index]) {
            this._products.splice(index, 1);
        }
    }

    inTheCart(product: Product) {
        return this._products.indexOf(product) !== -1 ;
    }

}