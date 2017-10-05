import {Component, HostBinding, OnInit} from "@angular/core";
import {InvoiceInterface} from "../../../../../../models/Interfaces/InvoiceInterface";
import {UserService} from "../../../../../../services/user.service";
import {ProductInterface} from "../../../../../../models/market/ProductInterface";
import {BotInterface} from "../../../../../../models/Interfaces/BotInterface";

@Component({
    selector: 'profile-games-component',
    templateUrl: 'games.component.html'
})
export class GamesComponent {
    @HostBinding('class') classes = 'profile-games-component';

    get bots(): BotInterface[] {
        return this._bots;
    }

    get isLoading(): boolean {
        return this._userService.isLoadingAuthorizedUser;
    }

    private _bots: BotInterface[];

    constructor(private _userService: UserService) {
        this._userService.loadingProcess.then(value => {
            if(value) {
                this._userService.authorizedUser.activeBots.then(bot => {
                    this._bots = bot;
                });
            }
        });
    }
}