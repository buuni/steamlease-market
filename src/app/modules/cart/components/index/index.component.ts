import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../models/market/Product";
import {CartService} from "../../../../services/cart.service";

@Component({
    selector: 'index-component',
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {

    products: Product[] = [];

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.products = this.cartService.products;
    }
}
