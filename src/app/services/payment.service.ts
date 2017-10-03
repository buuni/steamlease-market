import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {CartProduct} from "../models/market/CartProduct";


@Injectable()
export class PaymentService {

    constructor(private _apiService: ApiService) {}

    buildPayment(cartProducts: CartProduct[]) {
        const products = {};

        cartProducts.forEach(product => {
            products[product.id] = product.days;
        });

        const paymentData = {
            products: products
        };

        return this._apiService.signPayment<Array<any>>(paymentData)
            .then(data => {
                console.log(data);
                return data;
            });
    }
}