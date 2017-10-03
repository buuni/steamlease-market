import {User} from "./User";
import {UserInterface} from "./Interfaces/UserInterface";
import {InvoiceInterface} from "./Interfaces/InvoiceInterface";
import {Invoice} from "./Invoice";
import {ProxyInvoice} from "./ProxyInvoice";

export class ProxyUser implements UserInterface {
    get id(): number {
        return this._user.id;
    }

    get steamId(): number {
        return this._user.steamId;
    }

    get username(): string {
        return this._user.username;
    }

    get avatar(): string {
        return this._user.avatar;
    }

    get invoices(): Promise<InvoiceInterface[]> {

        if(!this._user.invoices) {
            this._user.invoices = this._invoiceHandler<Array<any>>().then(invoices => {
                return Promise.resolve(
                    invoices.map(item => {
                        return new ProxyInvoice(Invoice.fromJson(item), this._productHandler);
                    })
                );
            });
        }

        return this._user.invoices;
    }

    constructor(private _user: User,
                private _invoiceHandler: <T>() => Promise<T>,
                private _productHandler: <T>() => Promise<T>
    ) {}

}