import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {FilterService} from "../../../../../../services/filter.service";

@Component({
    selector: 'market-place-pagination',
    templateUrl: 'pagination.component.html',
})
export class PaginationComponent implements OnInit, OnDestroy {
    @HostBinding('class') classes = 'market-place-pagination';

    isForward: boolean = false;
    isBackward: boolean = false;

    private _page?: number;

    constructor(private _filterService : FilterService) {}

    ngOnInit(): void {
        this._page = this._filterService.page;

        this.isForward = !this._page ||this._page >= 1;
        this.isBackward = this._page > 1;
    }

    navigateBackwardEvent(): void {
        this._filterService.page -= 1;
        this._filterService.perform();
    }

    navigateForwardEvent(): void {
        // Так как JS может неправильно привести типы, приводим его сами.
        let currentPage = this._page ? parseInt(this._page.toLocaleString()) : 1;
        this._filterService.page = currentPage + 1;
        this._filterService.perform();
    }

    ngOnDestroy(): void {
    }
}