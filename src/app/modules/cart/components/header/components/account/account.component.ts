import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../../../models/market/Product";
import {CartService} from "../../../../../../services/cart.service";
import {UserService} from "../../../../../../services/user.service";
import {User} from "../../../../../../models/User";

@Component({
    selector: 'account-component',
    templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

    get authorizedUser() : User | null {
        return this._userService.authorizedUser;
    }

    get isAuthorized() : boolean {
        return this._userService.isAuthorized;
    }

    constructor(private _userService: UserService) {

    }

    ngOnInit(): void {

    }

}
