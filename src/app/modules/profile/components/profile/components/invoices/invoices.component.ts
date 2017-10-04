import {Component, HostBinding, Input} from "@angular/core";
import {User} from "../../../../../../models/User";
import {UserService} from "../../../../../../services/user.service";
import {InvoiceInterface} from "../../../../../../models/Interfaces/InvoiceInterface";

@Component({
    selector: 'profile-invoices-component',
    templateUrl: 'invoices.component.html'
})
export class InvoicesComponent {
    @HostBinding('class') classes = 'profile-invoices-component';

    get invoices(): InvoiceInterface[] {
        return this._invoices;
    }

    get isLoading(): boolean {
        return this._userService.isLoadingAuthorizedUser;
    }

    private _invoices: InvoiceInterface[];

    constructor(private _userService: UserService) {
        this._userService.loadingProcess.then(value => {
            if(value) {
                this._userService.authorizedUser.invoices.then(inv => {
                    this._invoices = inv;
                });
            }
        });
    }
}