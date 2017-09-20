import {Component, HostBinding, OnInit} from "@angular/core";

@Component({
    selector: "loading-component",
    templateUrl: "./loading.component.html"
})

export class LoadingComponent implements OnInit {
    @HostBinding('class') classes = 'loading-component';

    ngOnInit() {
    }

}