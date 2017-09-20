import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../models/market/Product";
import {CartService} from "../../../../services/cart.service";

@Component({
    selector: 'cart-component',
    templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

    products: Product[] = [];

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.products = this.cartService.products;
    }

    getSum(): Number {
        return this.products.reduce<Number>((previousValue, next) => (previousValue as number) + next.price.value, 0);
    }
}
