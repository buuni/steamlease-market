import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {User} from "../models/User";
import {UserInterface} from "../models/Interfaces/UserInterface";
import {ProxyUser} from "../models/ProxyUser";
import {InvoiceInterface} from "../models/Interfaces/InvoiceInterface";


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

    constructor(private _apiService: ApiService) {
        this._loadingProcess = this._apiService.getAuthorizedUser<Array<any>>()
            .then(data => {
                this._isLoadingAuthorizedUser = false;
                this._authorizedUser = new ProxyUser(
                    User.fromJson(data),
                    this._apiService.getUserInvoices.bind(this._apiService),
                    this._apiService.getProductById.bind(this._apiService)
                );
                return true;
            }).catch(() => this._isLoadingAuthorizedUser = false);
    }

}