
import {Product} from "./Product";
import {ProductInterface} from "./ProductInterface";
import {Price} from "./Price";

export class CartProduct implements ProductInterface {
    get id(): number {
        return this._product.id;
    }
    get steamId(): number {
        return this._product.steamId;
    }
    get name(): string {
        return this._product.name;
    }
    get description(): string {
        return this._product.description;
    }
    get price(): Price {
        return this._product.price;
    }
    get image(): string {
        return this._product.image;
    }
    get smallImage(): string {
        return this._product.smallImage;
    }
    get days(): number {
        return this._days;
    }

    set days(value: number) {
        this._days = value;
    }

    private _days: number = 3;

    constructor(private _product: Product) {}
}