import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Product} from "../models/market/Product";


@Injectable()
export class PaymentService {

    constructor(private _apiService: ApiService) {}

    buildPayment(products: Product[]) {

        const paymentData = {
            products: products.map(product => product.id)
        };

        return this._apiService.signPayment<Array<any>>(paymentData)
            .then(data => {
                console.log(data);
                return data;
            });
    }
}