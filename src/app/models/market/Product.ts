import {Price} from "./Price";
import {el} from "@angular/platform-browser/testing/src/browser_util";

export class Product {

    public id: number;
    public steamId: number;
    public name: string;
    public description: string;
    public price: Price;

    get image() : string {
        return 'http://cdn.akamai.steamstatic.com/steam/apps/' + this.steamId + '/header.jpg';
    }

    static fromJson(data: any) {
        const product = new Product();
        data = typeof data !== "object" ? JSON.parse(data) : data;

        product.name = data.name;
        product.id = data.id;
        product.description = data.about_the_game;
        product.price = Price.fromJson(data.price);
        product.steamId = data.steam_appid;

        return product;
    }
}