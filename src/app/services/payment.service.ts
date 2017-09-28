import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {User} from "../models/User";
import {UserService} from "./user.service";
import {CartService} from "./cart.service";
import {Product} from "../models/market/Product";


@Injectable()
export class PaymentService {

    private _userId: number;
    private _invoiceId: number;
    private _projectId: number;
    private _amount: number;
    private _signature: string;

    constructor(private _apiService: ApiService, private _userService: UserService, private _cartService: CartService) {
        // this._userId = this._userService.authorizedUser.id;
        this._userId = 1;
    }

    buildPayment(products: Product[]) {

        const paymentData = {
            products: products.map(product => product.id)
        };

        this._apiService.signPayment(paymentData)
            .then(data => console.log(data));
    }
}