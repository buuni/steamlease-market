import {Price} from "./Price";

export interface ProductInterface {
     id: number;
     steamId: number;
     name: string;
     description: string;
     price: Price;

     image: string;
     smallImage: string;
}