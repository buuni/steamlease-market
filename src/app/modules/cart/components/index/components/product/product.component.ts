import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {Product} from "../../../../../../models/market/Product";
import {CartService} from "../../../../../../services/cart.service";

@Component({
    selector: 'cart-product',
    templateUrl: 'product.component.html',
})
export class ProductComponent implements OnInit {
    @HostBinding('class') classes = 'cart-product';

    @Input() product: Product;

    constructor(private _cartService: CartService) {
    }

    inTheCart: boolean;

    removeFromCartEvent() {
        this.inTheCart = false;
        this._cartService.removeProduct(this.product);
    }

    ngOnInit(): void {
        this.inTheCart = this._cartService.inTheCart(this.product);
    }
}