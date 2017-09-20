import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'card-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent {
    @HostBinding('class') classes = 'card-header';
}