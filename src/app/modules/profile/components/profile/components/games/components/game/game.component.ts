import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {BotInterface} from "../../../../../../../../models/Interfaces/BotInterface";
import {ApiService} from "../../../../../../../../services/api.service";

@Component({
    selector: 'profile-games-item',
    templateUrl: 'game.component.html'
})
export class GamesItemComponent implements OnInit{
    @HostBinding('class') classes = 'profile-games-item';

    @Input() bot: BotInterface;

    get password(): string {
        return this.passwordHide ? '*'.repeat(6) : this.bot.password;
    }

    get steamGuard(): string {
        return this._steamGuard;
    }

    passwordHide: boolean = true;
    guardLoading: boolean = true;

    private _steamGuard: string;

    constructor(private _apiService: ApiService) {
    }

    ngOnInit(): void {
        this.refreshSteamGuard();
        this.passwordHide = true;
    }

    refreshSteamGuard() {
        this.guardLoading = true;
        this._apiService.getSteamGuard<Array<any>>(this.bot.activeId).then(data => {
            this._steamGuard = data['code'];
            this.guardLoading = false;
        });
    }
}