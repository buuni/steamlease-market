import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {Product} from "../../../../../../models/market/Product";
import {CartService} from "../../../../../../services/cart.service";

@Component({
    selector: 'market-place-product',
    templateUrl: 'product.component.html',
})
export class ProductComponent implements OnInit {
    @HostBinding('class') classes = 'market-place-product';

    @Input() product: Product;

    constructor(private _cartService: CartService) {
    }

    inTheCart: boolean;

    removeFromCartEvent() {
        this.inTheCart = false;
        let index = this._cartService.products.indexOf(this.product);
        this._cartService.products.splice(index, 1);
    }

    addToCartEvent() {
        this.inTheCart = true;
        this._cartService.products.push(this.product);
    }

    ngOnInit(): void {
        this.inTheCart = this._cartService.inTheCart(this.product);
    }
}