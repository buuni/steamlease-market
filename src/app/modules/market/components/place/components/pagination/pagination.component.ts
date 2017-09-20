import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";

@Component({
    selector: 'market-place-pagination',
    templateUrl: 'pagination.component.html',
})
export class PaginationComponent implements OnInit, OnDestroy {
    @HostBinding('class') classes = 'market-place-pagination';

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}