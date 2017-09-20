import {Component, HostBinding} from "@angular/core";

@Component({
    selector: 'market-component',
    templateUrl: 'market.component.html'
})
export class MarketComponent {
    @HostBinding('class') classes = 'market-component';
}