import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {InvoiceInterface} from "../../../../../../../../models/Interfaces/InvoiceInterface";

@Component({
    selector: 'profile-invoices-item',
    templateUrl: 'invoice.component.html'
})
export class InvoiceItemComponent implements OnInit{
    @HostBinding('class') classes = 'profile-invoices-item';

    @Input() invoice: InvoiceInterface;

    ngOnInit(): void {

    }
}