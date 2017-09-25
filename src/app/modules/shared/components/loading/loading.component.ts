import {Component, HostBinding, Input, OnInit} from "@angular/core";

@Component({
    selector: "loading-component",
    templateUrl: "./loading.component.html"
})

export class LoadingComponent implements OnInit {
    @HostBinding('class') classes = 'loading-component';

    @Input() width: number = 200;
    @Input() margin: string = '0 auto';
    @Input() loadingText: string = '';

    ngOnInit() {
    }

}