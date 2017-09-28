import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {Product} from "../../../../../../models/market/Product";
import {CartService} from "../../../../../../services/cart.service";
import {PaymentService} from "../../../../../../services/payment.service";

@Component({
    selector: 'cart-payment',
    templateUrl: 'payment.component.html',
})
export class PaymentComponent implements OnInit {
    @HostBinding('class') classes = 'cart-payment';

    get totalCount() : number {
        return this._cartService.products.length;
    }

    get totalSum() : Number {
        return this._cartService.totalSum();
    }

    constructor(private _cartService: CartService, private _paymentService: PaymentService) {

    }

    buildPaymentForm() {
        this._paymentService.buildPayment(this._cartService.products);
    }

    ngOnInit(): void {}
}