import {Price} from "./Price";
import {ProductInterface} from "./ProductInterface";

export class Product implements ProductInterface {
    get id(): number {
        return this._id;
    }

    get steamId(): number {
        return this._steamId;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get price(): Price {
        return this._price;
    }

    private _id: number;
    private _steamId: number;
    private _name: string;
    private _description: string;
    private _price: Price;

    get image() : string {
        return 'http://cdn.akamai.steamstatic.com/steam/apps/' + this.steamId + '/header.jpg';
    }

    get smallImage() : string {
        return 'http://cdn.akamai.steamstatic.com/steam/apps/' + this.steamId + '/capsule_231x87.jpg';
    }

    static fromJson(data: any) {
        const product = new Product();
        data = typeof data !== "object" ? JSON.parse(data) : data;

        product._name = data.name;
        product._id = data.id;
        product._description = data.about_the_game;
        product._price = Price.fromJson(data.price);
        product._steamId = data.steam_appid;

        return product;
    }
}