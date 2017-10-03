import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'profile-info-component',
    templateUrl: 'user-info.component.html'
})
export class UserInfoComponent {
    @HostBinding('class') classes = 'profile-info-component';
}