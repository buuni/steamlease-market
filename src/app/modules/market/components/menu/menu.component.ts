import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'market-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {
    @HostBinding('class') classes = 'market-menu';

}