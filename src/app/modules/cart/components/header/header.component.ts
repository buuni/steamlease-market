import {Component, HostBinding} from "@angular/core";
import {UserService} from "../../../../services/user.service";

@Component({
    selector: 'cart-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent {
    @HostBinding('class') classes = 'cart-header';

    get isAuthorized(): boolean {
        return this._userService.isAuthorized;
    }

    constructor(private _userService: UserService) {}
}