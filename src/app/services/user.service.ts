import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {User} from "../models/User";
import {UserInterface} from "../models/Interfaces/UserInterface";
import {InvoiceInterface} from "../models/Interfaces/InvoiceInterface";
import {Invoice} from "../models/Invoice";
import {ProductService} from "./product.service";
import {Product} from "../models/market/Product";
import {ProductInterface} from "../models/market/ProductInterface";
import {BotInterface} from "../models/Interfaces/BotInterface";
import {Bot} from "../models/Bot";


@Injectable()
export class UserService {

    private _authorizedUser?: UserInterface;
    private _isLoadingAuthorizedUser: boolean = true;
    private _loadingProcess: Promise<boolean>;

    get isLoadingAuthorizedUser(): boolean {
        return this._isLoadingAuthorizedUser;
    }

    get isAuthorized(): boolean {
        return !!this._authorizedUser;
    }

    get authorizedUser(): UserInterface | null {
        return this._authorizedUser;
    }

    get loadingProcess():Promise<boolean> {
        return this._loadingProcess;
    }

    set authorizedUser(value: UserInterface) {
        this._authorizedUser = value;
    }

    constructor(private _apiService: ApiService, private _productsService: ProductService) {
        this._loadingProcess = this._apiService.getAuthorizedUser<Array<any>>()
            .then(data => {
                this._isLoadingAuthorizedUser = false;
                this._authorizedUser = User.fromJson(data);

                this.authorizedUser.invoices = this._apiService.getUserInvoices<Array<any>>().then(array => {
                    return array.map(item => {
                        const invoice = Invoice.fromJson(item);
                        invoice.products = item.products.map(pr => {
                            return this._productsService.loadProductById(pr.id);
                        });
                        return invoice;
                    });
                });

                this.authorizedUser.activeBots = this._apiService.getUserActiveGames<Array<any>>().then(array => {
                    const bots: BotInterface[] = [];
                    array.forEach((invoice: any) => {
                        invoice.forEach((item:any) => {
                            if(item.bot) {
                                const bot: BotInterface = Bot.fromJson(item.bot);
                                this._productsService.loadProductById(item.product_id).then(pr => bot.product = pr);
                                bots.push(bot);
                            }
                        });
                    });

                    return bots;
                });

                return true;
            }).catch(() => this._isLoadingAuthorizedUser = false);
    }

}