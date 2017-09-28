import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {User} from "../models/User";


@Injectable()
export class UserService {

    private _authorizedUser?: User;
    private _isLoadingAuthorizedUser: boolean = true;

    get isLoadingAuthorizedUser(): boolean {
        return this._isLoadingAuthorizedUser;
    }

    get isAuthorized(): boolean {
        return !!this._authorizedUser;
    }

    get authorizedUser(): User | null {
        return this._authorizedUser;
    }

    constructor(private _apiService: ApiService) {
        this._apiService.getAuthorizedUser<Array<any>>()
            .then(data => {
                this._isLoadingAuthorizedUser = false;
                this._authorizedUser = User.fromJson(data);
            }).catch(() => this._isLoadingAuthorizedUser = false);
    }

}