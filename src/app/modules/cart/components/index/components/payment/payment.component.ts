import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from "@angular/core";
import {Product} from "../../../../../../models/market/Product";
import {CartService} from "../../../../../../services/cart.service";
import {PaymentService} from "../../../../../../services/payment.service";

@Component({
    selector: 'cart-payment',
    templateUrl: 'payment.component.html',
})
export class PaymentComponent implements OnInit {
    @HostBinding('class') classes = 'cart-payment';
    @ViewChild('paymentForm') form: ElementRef;

    get sign(): any {
        return this._sign;
    }

    get totalCount() : number {
        return this._cartService.products.length;
    }

    get totalSum() : Number {
        return this._cartService.totalSum();
    }

    private _sign?:any;

    constructor(private _cartService: CartService, private _paymentService: PaymentService) {
    }

    buildPaymentForm() {
        return this._paymentService.buildPayment(this._cartService.products)
            .then(data => {
                this._sign = data;
                const form = this.form.nativeElement;

                form.target = '_blank';
                form.children.project.value  = data['project'];
                form.children.user.value  = data['user'];
                form.children.amount.value  = data['amount'];
                form.children.project_invoice.value  = data['project_invoice'];
                form.children.signature.value  = data['signature'];

                return form;
            }).then(form => form.submit());
    }

    ngOnInit(): void {
    }
}