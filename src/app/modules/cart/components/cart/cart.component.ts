import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../models/market/Product";
import {CartService} from "../../../../services/cart.service";

@Component({
    selector: 'cart-component',
    templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

    products: Product[] = [];

    get isLoading() : boolean {
        return this._cartService.isLoadingCartProducts;
    }

    constructor(private _cartService: CartService) {}

    get totalSum() : Number {
        return this._cartService.totalSum();
    }

    ngOnInit(): void {
        this.products = this._cartService.products;
    }
}
