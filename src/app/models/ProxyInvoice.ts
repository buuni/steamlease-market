import {InvoiceInterface} from "./Interfaces/InvoiceInterface";
import {ProductInterface} from "./market/ProductInterface";

export class ProxyInvoice implements InvoiceInterface {
    get id(): number {
        return this._invoice.id;
    }
    get amount(): number {
        return this._invoice.amount;
    }
    get createdDate(): string {
        return this._invoice.createdDate;
    }
    get paidAmount(): number {
        return this._invoice.paidAmount;
    }
    get paidDate(): string {
        return this._invoice.paidDate;
    }
    get products(): Promise<ProductInterface[]> {
        if(!this._invoice.products) {
            this._invoice.products = this._handler<Array<any>>().then(products => {
                return Promise.resolve(
                    products.map(item => {
                        return new (Invoice.fromJson(item));
                    })
                );
            });
        }

        return this._invoice.products;
    }
    get status(): string {
        return this._invoice.status;
    }

    constructor(private _invoice: InvoiceInterface, private _handler: <T>() => Promise<T>) {}

}