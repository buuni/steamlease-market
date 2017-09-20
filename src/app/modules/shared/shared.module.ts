import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoadingComponent} from "./components/loading/loading.component";

@NgModule({
    imports: [CommonModule],
    exports: [CommonModule, PageNotFoundComponent, LoadingComponent],
    declarations: [PageNotFoundComponent, LoadingComponent]
})
export class SharedModule {}