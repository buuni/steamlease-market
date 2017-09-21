import {Component, HostBinding, OnInit} from "@angular/core";
import {FilterService} from "../../../../services/filter.service";

@Component({
    selector: 'market-search',
    templateUrl: 'search.component.html',
})
export class SearchComponent implements OnInit {
    @HostBinding('class') classes = 'market-search';

    search: string = null;

    constructor(private _filterService: FilterService) {}

    searchEvent() {
        this._filterService.productName = this.search;
        this._filterService.page = null;
        this._filterService.perform();
    }

    ngOnInit() {
        this.search = this._filterService.productName;
    }
}