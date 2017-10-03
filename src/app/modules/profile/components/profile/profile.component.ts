import {Component, HostBinding, OnInit} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/User";

@Component({
    selector: 'profile-component',
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
    @HostBinding('class') classes = 'profile-component';

    constructor(private _userService: UserService, private _router: Router) {}

    ngOnInit(): void {
        this._userService.loadingProcess.then(result => {
            if(!result) {
                return this._router.navigateByUrl('/');
            }

            console.log(this._userService.authorizedUser);
        });
    }
}