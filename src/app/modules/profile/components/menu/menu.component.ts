import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'profile-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {
    @HostBinding('class') classes = 'market-menu profile-menu';

}