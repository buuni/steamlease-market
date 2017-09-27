import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../models/market/Product";
import {CartService} from "../../../../services/cart.service";
import {Http, Response} from "@angular/http";
import {UserService} from "../../../../services/user.service";

@Component({
    selector: 'index-component',
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {

    products: Product[] = [];

    constructor(private cartService: CartService, private _http: Http, private userService: UserService) {}

    ngOnInit(): void {
        this.products = this.cartService.products;
    }

    testPayment() {
        this._http.get('/api/payment')
            .subscribe((res: Response) => {
                console.log(res.json());
            });
    }
}
