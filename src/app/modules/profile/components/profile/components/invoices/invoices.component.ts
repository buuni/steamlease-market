import {Component, HostBinding, Input} from "@angular/core";
import {User} from "../../../../../../models/User";

@Component({
    selector: 'profile-invoices-component',
    templateUrl: 'invoices.component.html'
})
export class InvoicesComponent {
    @HostBinding('class') classes = 'profile-invoices-component';
}