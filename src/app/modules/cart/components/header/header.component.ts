import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'cart-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent {
    @HostBinding('class') classes = 'cart-header';
}